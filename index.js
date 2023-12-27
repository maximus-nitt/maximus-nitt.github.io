// To retrieve files from DB

function decrChar(ch) {
    switch(ch) { 
    case 'A':
        return [true, '9'];
    case 'a':
        return [true, '9'];
    case '0':
        return [true, 'Z'];
    default:
        return [false, String.fromCharCode(ch.charCodeAt(0) - 1)];
    }
}

function predecessor(input) {
    let X = input.charAt(0);
    let Y = input.charAt(1);
    let Z = input.charAt(2);
    let flag = false;
    [flag, Z] = decrChar(Z);
    if (flag == false)
        return X + Y + Z;
    [flag, Y] = decrChar(Y);
    if (flag == false)
        return X + Y + Z;
    [flag, X] = decrChar(X);
    return X + Y + Z;
}

// Helper functions

function id(idVal) {
    return document.getElementById(idVal);
}

function node(name) {
    return document.createElement(name);
}

function id(idVal) {
    return document.getElementById(idVal);
}

function section(btn, idVal) {
    btn.addEventListener('click', () => {
        curSection.style.display = 'none';
        curSection = idVal;
        curSection.style.display = 'block';
    })
}

const homeBtn = id('home-btn');
const eventsBtn = id('events-btn');
const membersBtn = id('members-btn');
const aboutUsBtn = id('about-us-btn');

const eventsList = id('events-list');

const homeSection = id('home-section');
let curSection = homeSection;
curSection.style.display = 'block';

const eventsSection = id('events-section');
const membersSection = id('members-section');
const aboutUsSection = id('about-us-section');


section(eventsBtn, eventsSection);
section(homeBtn, homeSection);
section(membersBtn, membersSection);
section(aboutUsBtn, aboutUsSection);

let eventId = 'AAB';

async function listEvents() {
    while (eventId != '999') {
        const response = await fetch('events/' + eventId + "h.json");
        const data = await response.json();
        console.log(data);
        eventItem(data, eventId);
        eventId = predecessor(eventId);
    }
}

listEvents();

const eventDetails = id('event-details');
const eventTitle = id('event-title');
const eventDate = id('event-date');
const eventDescription = id('event-description');

function setEventHeader(data) {
    eventTitle.innerHTML = data['title'];
    eventDate.innerHTML = data['date'];
}

function setEventContent(data) {
    eventDescription.innerHTML = data['description'];
}

function eventShow(btn, eventId) {
    console.log(eventId);
    btn.addEventListener('click', () => {
        curSection.style.display = 'none';
        curSection = eventDetails;
        curSection.style.display = 'block';
        fetch('events/' + eventId + 'h.json')
            .then(response => response.json())
            .then(data => setEventHeader(data))
            .catch(error => console.log(error));
        fetch('events/' + eventId + 'c.json')
            .then(response => response.json())
            .then(data => setEventContent(data))
            .catch(error => console.log(error));
    });
}

function eventItem(data, eventID) {
    const item = node('div');
    const title = node('h4');
    title.innerHTML = data['title'];
    item.appendChild(title);
    item.append(data['summary']); 
    item.setAttribute('class', 'event-item');
    eventShow(item, eventId);
    eventsList.appendChild(item);
}

const membersGallary = id('members-gallary');

function memberItem(memberid, data) {
    const item = node('span');
    const title = node('h4');
    title.innerHTML = data['fname'];
    const image = node('img');
    image.setAttribute('src', data['image'] != null ?
        data['image'] :
        'avatar.png'
    );
    image.setAttribute('alt', 'failed to load image');
    item.appendChild(image);
    item.appendChild(title);
    item.setAttribute('member-id', memberId);
    item.setAttribute('class', 'members-item');
    membersGallary.appendChild(item);
}

let memberId = 'AAG';
while (memberId != '999') {
    fetch('members/' + memberId + "h.json")
        .then(response => response.json())
        .then(data => memberItem(memberId, data))
        .catch(error => console.log(error));
    memberId = predecessor(memberId);
}