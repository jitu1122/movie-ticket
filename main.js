let data = [];                  // Primary data variable for sample JSON.

let selectedSeats = {};         // Data variable for selected seats.

let totalAmount = 0;            // Data variable for total amount.


/* Event Delegation Using ES6 Class */

class SeatLayout {
    constructor(elem) {
        this.price = {};
        elem.onclick = this.onClick.bind(this); // (*)
        data.map((r, i) => {
            this.price[r.tname] = r.price;
            createLayout(r);
        });

    }
    occupied(event) {
        alert(`Seat number: ${event.target.id} is unavailable.`)
    }
    select(event) {
        let tier = event.target.dataset.tier;
        let id = event.target.id;

        if (selectedSeats.hasOwnProperty(tier)) {
        if (selectedSeats[tier].indexOf(id) < 0) {
            selectedSeats[tier].push(id);
            totalAmount += this.price[tier];
        } else {
            selectedSeats[tier].splice(selectedSeats[tier].indexOf(id), 1);
            totalAmount -= this.price[tier];
        }
        } else {
            this.reset();
            selectedSeats = {};
            selectedSeats[tier] = [];
            selectedSeats[tier].push(id);
            totalAmount = this.price[tier];
        }
        event.target.classList.toggle('selected');
        document.getElementById('amount').innerText = totalAmount;
        document.getElementById('total-seat-selected').innerText = selectedSeats[tier].length;
        document.getElementById('selected-seats').innerText = selectedSeats[tier].toString().replace(/,/g,', ');
    }
    reset(){
        const seats = document.getElementsByClassName('free-seat');
        for(let seat of seats) {
            seat.classList.remove('selected')
        }
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            // this[action](event.target.id, tier);
            this[action](event);
        }
    };
}


/* Function to load data from Sample JSON */
function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './seats.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            data = JSON.parse(xobj.responseText).data;
            new SeatLayout(document.getElementById('seat-layout'));
        }
    };
    xobj.send(null);
}



loadJSON();

function createSeats(tier, index, status) {
    const seat = document.createElement('div');
    seat.classList.add('seat-outer');
    seat.innerHTML = `<div id="${tier.charAt(0).toUpperCase() + index}" class="grid-item ${status + '-seat'}" data-action="${status === 'free' ? 'select' : 'occupied'}" data-tier="${tier}"></div>`;
    document.getElementById(tier + '-layout').appendChild(seat);
}

function createLayout(tier) {
    const seatLayout = document.createElement('div');
    seatLayout.innerHTML = `<div id="${tier.tname}-layout" class="grid-container"></div><div class="tier-title"></div><div class="tier-text">${tier.tname.toUpperCase()}</div>`;
    document.getElementById('seat-layout').appendChild(seatLayout);
    const totalSeats = tier.free + tier.blocked;
    for (let i = 1; i <= totalSeats; i++) {
        createSeats(tier.tname, i, i<=tier.free ? 'free' : 'blocked');
    }
}

/* -----------------------// Signature //---------------------- */
/* ------------ Checkout your browsers console :) --------------*/
console.log('\n\nDeveloped By: \n%c Jitendra Singh Chauhan\n\n',
    'font-weight: bold; font-style: Italic; font-size: 40px;' +
    'color: #18AEEF;font-family: Arial, sans-serif');
/* ------------------------------------------------------------ */


