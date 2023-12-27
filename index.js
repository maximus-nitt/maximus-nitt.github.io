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
    [flag, X] = decrChar(X)
    return X + Y + Z;
}

function id(idVal) {
    return document.getElementById(idVal)
}

function node(name) {
    return document.createElement(name)
}

function id(idVal) {
    return document.getElementById(idVal)
}

function chSection(newSection) {
    curSection.style.display = 'none'
    curSection = newSection
    curSection.style.display = 'block'
}

function section(btn, idVal) {
    btn.addEventListener('click', () => chSection(idVal))
}

const homeBtn = id('home-btn')
const eventsBtn = id('events-btn')
const membersBtn = id('members-btn')
const aboutUsBtn = id('about-us-btn')

const eventsList = id('events-list')

const homeSection = id('home-section')
let curSection = homeSection
curSection.style.display = 'block'

const eventsSection = id('events-section');
const membersSection = id('members-section');
const aboutUsSection = id('about-us-section');

section(eventsBtn, eventsSection)
section(homeBtn, homeSection)
section(membersBtn, membersSection)
section(aboutUsBtn, aboutUsSection)

async function eventItem(eventId) {
    const data = await getJson('events/' + eventId + "h.json");
    const item = node('div');
    const title = node('h4');
    title.innerHTML = data['title'];
    item.appendChild(title);
    item.append(data['summary']); 
    item.setAttribute('class', 'event-item');
    eventShow(item, eventId);
    eventsList.appendChild(item);
}

async function listEvents() {
    let eventId = 'AAB';
    while (eventId != '999') {
        eventItem(eventId);
        eventId = predecessor(eventId);
    }
}

listEvents();

const eventDetails = id('event-details');
const eventTitle = id('event-title');
const eventDate = id('event-date');
const eventDescription = id('event-description');

async function getJson(url) {
    const response = await fetch(url);
    return response.json();
}

async function setEventHeader(eventId) {
    const data = await getJson('events/' + eventId + 'h.json');
    eventTitle.innerHTML = data['title'];
    eventDate.innerHTML = data['date'];
}

async function setEventContent(eventId) {
    const data = await getJson('events/' + eventId + 'c.json');
    eventDescription.innerHTML = data['description'];
}

function eventShow(btn, eventId) {
    btn.addEventListener('click', async () => {
        await setEventHeader(eventId);
        await setEventContent(eventId);
        chSection(eventDetails);
    });
}

const membersGallary = id('members-gallary');
const memberDetails = id('member-details');

const memberPic = id('member-pic');
const memberName = id('member-name');
const memberInfo = id('member-info');
const memberDept = id('member-dept');
const memberRole = id('member-role');

async function setMemberHeader(memberId) {
    const data = await getJson('members/' + memberId + 'h.json');
    memberPic.setAttribute('src', data['image'] != null ?
        data['image'] : 'avatar.png');
    memberName.innerHTML = data['fname'] + ' ' + data['lname'];
}

async function setMemberContent(memberId) {
    const data = await getJson('members/' + memberId + 'c.json');
    memberDept.innerHTML = 'Department: ' + data['dept'];
    memberRole.innerHTML = 'Role: ' + data['role'];
    memberInfo.innerHTML = data['info'];
}

function memberShow(btn, memberId) {
    btn.addEventListener('click', async () => {
        await setMemberHeader(memberId);
        await setMemberContent(memberId);
        chSection(memberDetails);
    });
}

function memberItem(data, memberId) {
    const item = node('span');
    const title = node('h4');
    title.innerHTML = data['fname'];
    const image = node('img');
    image.setAttribute('src', data['image'] != null ?
        data['image'] : 'avatar.png');
    image.setAttribute('alt', 'failed to load image');
    item.appendChild(image);
    item.appendChild(title);
    item.setAttribute('member-id', memberId);
    item.setAttribute('class', 'members-item');
    memberShow(item, memberId);
    membersGallary.appendChild(item);
}

async function listMembers() {
    let memberId = 'AAG';
    while (memberId != '999') {
        const response = await fetch('members/' + memberId + "h.json");
        const data = await response.json();
        memberItem(data, memberId);
        memberId = predecessor(memberId);
    }
}

listMembers();

history.pushState({}, null, null);
window.addEventListener('popstate', () => {
    if (curSection == homeSection) {
        history.back();
    } else {
        history.pushState({}, null, null);
        switch (curSection) {
        case eventDetails:
            chSection(eventsSection);
            break;
        case memberDetails:
            chSection(membersSection);
            break;
        default:
            chSection(homeSection);
        }
    }
});

const urlQuery = window.location.search;
const urlParam = new URLSearchParams(urlQuery);

function processUrl(url) {
    switch (url.get('section')) {
    case 'event':
        if (url.get('id') == null) {
            chSection(eventsSection);
        }
    }
}

processUrl(urlParam);