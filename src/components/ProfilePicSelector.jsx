import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, InputLabel, MenuItem, FormControl, Select, List } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import {useParams, useSearchParams  } from 'react-router-dom';


// Need to run the following command for the color picker to work:
// npm i @uiw/react-color


function ProfilePicSelector() {

  const [users, setUsers] = useState([]);
  const { username } = useParams();
  let userProfilePic, userID;
  const token = localStorage.getItem('site')

  useEffect(() => {
    fetch('http://localhost:8080/user/index', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },})
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error fetching users:', error));
  }, []);

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      userID = users[i].id;
    }
  };

  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === username){
      userProfilePic = users[i].profilePic;
    }
  };

  const searchParams = new URLSearchParams(userProfilePic);
  let defaultSkinTone = searchParams.get('baseColor');
  let defaultHairColor = searchParams.get('hairColor');
  let defaultShirtColor = searchParams.get('shirtColor');
  let defaultMouth = searchParams.get('mouth');
  let defaultHair = searchParams.get('hair');
  let defaultEyes = searchParams.get('eyes');
  let defaultEyesColor = searchParams.get('eyesColor');
  let defaultEyeShadowColor = searchParams.get('eyeShadowColor');
  let defaultEyebrows = searchParams.get('eyebrows');
  let defaultBackgroundColor = searchParams.get('backgroundColor');

  let hex, facialOptions, hairStyleOptions, eyesOptions, eyebrowOptions, firstName, lastName, birthday, bio;
  let user = {};
  
  const facialExpressions = ['frown', 'laughing', 'nervous', 'pucker', 'sad', 'smile', 'smirk', 'surprised']
  const hairStyles = ['dannyPhantom', 'dougFunny', 'fonze', 'full', 'mrClean', 'mrT', 'pixie', 'turban']
  const eyesStyles = ['eyes', 'eyesShadow', 'round', 'smiling', 'smilingShadow']
  const eyesBrowStyles = ['down', 'eyelashesDown', 'eyelashesUp', 'up']

  const[skinTone, setSkinTone] = useState((defaultSkinTone)? defaultSkinTone: '');
  const[hairStyle, sethairStyle] = useState('mrClean');
  const[hairColor, setHairColor] = useState('');
  const[eyes, setEyes] = useState('round');
  const[eyesColor, setEyesColor] = useState('');
  const[eyeShadow, setEyeShadow] = useState('');
  const[shirtColor, setShirtColor] = useState('');
  const[facialExpression, setFacialExpression] = useState('laughing');
  const[eyebrows, setEyebrows] = useState('up');
  const[backgroundColor, setBackgroundColor] = useState('FFFFFF');
 
  useEffect(() => {
    if(defaultMouth != null){ setFacialExpression(defaultMouth); }
    if(defaultHair != null){ sethairStyle(defaultHair); }
    if(defaultEyes != null) { setEyes(defaultEyes); }
    if (defaultEyebrows != null){ setEyebrows(defaultEyebrows); }
    if(defaultEyeShadowColor != null){ setEyeShadow(defaultEyeShadowColor); }
    if (defaultSkinTone != null){ setSkinTone(defaultSkinTone); }
    if(defaultHairColor != null) { setHairColor(defaultHairColor); }
    if(defaultEyesColor != null) { setEyesColor(defaultEyesColor); }
    if (defaultShirtColor != null){ setShirtColor(defaultShirtColor); }
    if (defaultBackgroundColor != null){ setBackgroundColor(defaultBackgroundColor); }
  }, [userProfilePic]);

  let profilePic = `https://api.dicebear.com/8.x/micah/svg?radius=50&baseColor=${skinTone}&hairColor=${hairColor}` +
                    `&shirtColor=${shirtColor}&mouth=${facialExpression}&hair=${hairStyle}&eyes=${eyes}&eyesColor=${eyesColor}` +
                    `&eyeShadowColor=${eyeShadow}&eyebrows=${eyebrows}&backgroundColor=${backgroundColor}`;

  const handleClick=(event)=>{
    event.preventDefault()
    const user={profilePic}
    fetch(`http://localhost:8080/user/${userID}/update`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`,
      },
      body:JSON.stringify(user)
    }).then(()=>{
        alert(`Profile Pic Updated!`)
    }).then(event =>  window.location.href=`/myaccount/${username}`) // Redirects back to user's profile
    }

    useEffect(() => {
      console.log(profilePic)
    }, [profilePic]);

  

  const handleFacialExpressionChange = (event) => { setFacialExpression(event.target.value); };

  const handleHairStyleChange = (event) => { sethairStyle(event.target.value); };

  const handleEyebrowChange = (event) => { setEyebrows(event.target.value); };

  const handleEyesChange = (event) => { setEyes(event.target.value); };

  const generateRandomColor = (event) => { 
    return (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
  };

  const Randomize = (event) => { 
    setSkinTone(generateRandomColor);
    sethairStyle(hairStyles[(Math.floor(Math.random() * 7))]); //0-7
    setHairColor(generateRandomColor);
    setEyes(eyesStyles[(Math.floor(Math.random() * 4))]); //0-4
    setEyesColor(generateRandomColor);
    setEyeShadow(generateRandomColor);
    setShirtColor(generateRandomColor);
    setFacialExpression(facialExpressions[(Math.floor(Math.random() * 7))]); //0-7
    setEyebrows(eyesBrowStyles[(Math.floor(Math.random() * 3))]); //0-3
    setBackgroundColor(generateRandomColor);
  };

  if (facialExpression) { 
    facialOptions = facialExpressions.map((el) => <div key={el} ><Button variant="contained" value={el} onClick={handleFacialExpressionChange} style={{margin : '5px'}}>{el}</Button></div>); 
  } 

  if (hairStyle) { 
    hairStyleOptions = hairStyles.map((el) => <div key={el} ><Button variant="contained" value={el} onClick={handleHairStyleChange} style={{margin : '5px'}}>{el}</Button></div>); 
  } 

  if (eyebrows) { 
    eyebrowOptions = eyesBrowStyles.map((el) => <div key={el} ><Button variant="contained" value={el} onClick={handleEyebrowChange} style={{margin : '5px'}}>{el}</Button></div>); 
  } 

  if (eyes) { 
    eyesOptions = eyesStyles.map((el) => <div key={el} ><Button variant="contained" value={el} onClick={handleEyesChange} style={{margin : '5px'}}>{el}</Button></div>); 
  } 

  return (
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px', width: 'auto'}}>
      <h2>{username}'s<br></br>Profile Pic</h2>
      <div className="float-container">
        <div className="float-child-left" >
          <img
          src={profilePic}
          alt="avatar"
          />    
        </div>
        <div className="float-child-right">
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+skinTone}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Skin Tone</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setSkinTone(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="hairStyle"
                value={hairStyle}
              >
                <Typography>Hair Style</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {hairStyleOptions}
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+hairColor}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Hair Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setHairColor(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="eyes"
                value={eyes}
              >
                <Typography>Eyes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {eyesOptions}
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+eyesColor}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Eye Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setEyesColor(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+eyeShadow}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Eye Shadow Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setEyeShadow(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+shirtColor}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Shirt Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setShirtColor(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="facialExpression"
                value={facialExpression}
              >
                <Typography>Facial Expression</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {facialOptions}
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="eyebrows"
                value={eyebrows}
              >
                <Typography>Eye Brows</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {eyebrowOptions}
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                style={{backgroundColor: '#'+backgroundColor}}
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Background Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setBackgroundColor(color.hex.replace('#', ''));
                    }}
                  />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div>
      <Button variant="contained" onClick={Randomize} style={{margin : '5px'}}>
          RANDOMIZE
        </Button >
      </div>
      <div>
        <Button variant="contained" onClick={handleClick} style={{margin : '5px'}}>
          Accept
        </Button >
        <Button variant="contained" onClick={event =>  window.location.href=`/myaccount/${username}`} style={{margin : '5px'}}>
          Cancel
        </Button >
      </div>
    </div>
  );
}

export default ProfilePicSelector;