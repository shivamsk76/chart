import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as ReactBootStrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Webcam.css'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function WebCam() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hangupCall, setHangupCall] = useState(false)


  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://192.168.43.231:5000");
    console.log("server connected");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });


    socket.current.on("yourID", (id) => {
      setYourID(id);  
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      setLoading(true)
      setHangupCall(false)
    })
    socket.current.on('disconnect', (users) => {
      setHangupCall(users)
    })


  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video style={{
        zIndex: 2,
        right: 0,
        width: 385,
        height: 500,
        bottom: 5,
        margin: 5,
        background: 'black',
      }} playsInline muted ref={userVideo} autoPlay
      />
    );

  }



  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <div>
      <Video style={{
        zIndex: 1,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%',
        background: 'black'
      }} playsInline ref={partnerVideo} autoPlay
      />
      <button onClick={disconnectCall}>Hangup</button>
      </div>
      
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }

  function disconnectCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: false,
    });
    peer.on("stream", stream => {
      partnerVideo.current.srcObject = null;
    });


  }

  let deleteCall;
  if (hangupCall) {
    deleteCall = (
      <div>
        
      </div>
    )

  }



  return (
    <Container>
      {PartnerVideo}
      {UserVideo}
      <Row>
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
      </Row>

      {loading ? (incomingCall) : (<Button variant="primary" disabled>
        <ReactBootStrap.Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
    Loading...
      </Button>)}



    </Container>
  );
}

export default WebCam;