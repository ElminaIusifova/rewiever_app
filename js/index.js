var app = {

    stars: document.querySelectorAll('.star'),

    reviews: [
        {
            "id": 237428374,
            "name": "Timmies",
            "rating": 4,
            "img": "path/and/filename/on/device.png"
        },
        {
            "id": 123987944,
            "name": "Starbucks",
            "rating": 3,
            "img": "path/and/filename/on/device.png"
        }
],
    KEY: 'iusi0001',

    photoTaken: false,

    init: function () {

        let btn = document.querySelector('.cameraDiv');
        btn.addEventListener('click', app.takePic);


        //checking an update of local storage
        if (localStorage.getItem(app.KEY)) {
            app.updateReview();
            app.createList();


        } else {
            app.updateStorage();
            app.createList();
        }

        // adding event listeners
        let add = document.getElementById("addButton");
        add.addEventListener("click", app.inputPage);

        let save = document.querySelector("#savebtn");
        save.addEventListener("click", app.showReviewList);

        let cancel = document.getElementById("cancelbtn");
        cancel.addEventListener("click", app.switchPage);

        let back = document.getElementById("backbtn");
        back.addEventListener("click", app.switchPage);

        let delt = document.getElementById("deletebtn");
        delt.addEventListener("click", app.deleteItem);

        let takepic = document.getElementById("btn-small");
        takepic.addEventListener("click", app.takePic);

        app.stars.forEach(function (star) {
            star.addEventListener('click', app.setRating);
        });


    },


    updateReview: function () {
        app.reviews = JSON.parse(localStorage.getItem(app.KEY));
    },



    //ADD BUTTON
    inputPage: function () {
        // app.updateStorage();
        document.getElementById("reviewList").classList.remove("active");
        document.getElementById("addReview").classList.add("active");
        document.getElementById("nm").value = "";
        document.getElementById("photo").src = "img/logo.png";
        app.photoTaken = false;
    },



    //TAKEPICTURE BUTTON
    takePic: function (ev) {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,
            targetHeight: 400,
            targetWidth: 300
        };
        navigator.camera.getPicture(app.cameraIsGood, app.cameraBad, options);
    },


    //SAVE BUTTON
    showReviewList: function () {
        let name = document.getElementById("nm").value;
        let img = document.getElementById("photo").src;

        //        if(name  && app.photoTaken){


        if (name) {

            let page = document.querySelector("#reviewList");
            let ul = document.querySelector(".list-view");

            let getDat = Date.now();
            let name = document.getElementById("nm").value;
            let rate = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
            let img = document.getElementById("photo").src;
            app.switchPage();
            ul.innerHTML = "";

            let review = [{
                "id": getDat,
                "name": name,
                "img": img,
                "rating": rate
        }];

            app.reviews = app.reviews.concat(review);
            app.createList();
            app.updateStorage();

        } else {
            alert("Please enter value!")

        }

        //******DISPLAYING SAVED MESSAGE

        let add = document.getElementById('info');
        add.textContent = "SAVED";
        let overlay = document.querySelector(".overlay");

        overlay.classList.add("active");
        setTimeout(() => {
            overlay.classList.remove("active");
        }, 500);



       

    },


    // CARD CREATING
    createList: function () {
        let page = document.querySelector("#reviewList");

        let ul = document.querySelector(".list-view");

        ul.innerHTML = "";
        app.reviews.forEach(review => {


            let li = document.createElement('li');
            li.classList.add("list-item");

            let div = document.createElement('div');
            div.classList.add('divForContainer');
            div.setAttribute('id', 'usediv');
            div.setAttribute('data-id', review.id);
            li.setAttribute("id", "s" + review.id);

            let img = document.createElement("img");
            img.setAttribute("src", review.img);
            let h = document.createElement("p");
            h.setAttribute("id", "name");
            let h1 = document.createElement("p");
            h1.setAttribute("id", "rate");
            let btn = document.createElement("span"); // arrow button
            btn.className = "action-right icon arrow_right";
            btn.setAttribute('arrow-id', review.id);

            h.textContent = review.name;
            h1.textContent = review.rating;

            div.appendChild(img);
            div.appendChild(btn);
            div.appendChild(h);
            //            div.appendChild(h1);
            app.createStars(div);
            li.appendChild(div);
            ul.appendChild(li);


            let p = document.querySelector("#reviewList .stars");
            //console.log(p);
            p.setAttribute("data-rating", review.rating);
            console.log(review.rating);
            let stars = document.querySelectorAll(`#s${review.id} .stars .star`);
            //console.log(stars);
            let num = review.rating;
            for (let i = 0; i < num; i++) {

                stars[i].classList.add("rated");
            }




            //ARROW BUTTON ON EACH CARD
            btn.addEventListener('click', app.reviewDetail);



        });
        page.appendChild(ul);
        
        
 /*******DISPLAYING A MESSAGE DElETED**/

        let empty = document.getElementById('mes');
        //console.log(empty, "here");
        empty.textContent = "No displayed cards"
        if (app.reviews.length == 0) {
           // console.log(app.reviews);
            let secondOverlay = document.querySelector("#secondMessage");
            secondOverlay.classList.add("active");
            

        }else{
            let secondOverlay = document.querySelector("#secondMessage");
            secondOverlay.classList.remove("active");
        }

    },


    //STARS
    createStars: function (parent) {

        let div = document.createElement("div");
        div.setAttribute("class", "stars");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let span4 = document.createElement("span");
        let span5 = document.createElement("span");
        span1.setAttribute("class", "star");
        span2.setAttribute("class", "star");
        span3.setAttribute("class", "star");
        span4.setAttribute("class", "star");
        span5.setAttribute("class", "star");
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
        div.appendChild(span4);
        div.appendChild(span5);
        parent.appendChild(div);

    },

    //RATING STARS FUNCTION
    setRating: function (ev) {
        let span = ev.currentTarget;
        let stars = document.querySelectorAll('.star');
        let match = false;
        let num = 0;
        app.stars.forEach(function (star, index) {
            if (match) {
                star.classList.remove('rated');
            } else {
                star.classList.add('rated');
            }
            if (star === span) {
                match = true;
                num = index + 1;
            }

        });

        document.querySelector('.stars').setAttribute('data-rating', num);
    },





    //ARROW BUTTON ON THE CARD

    reviewDetail: function (ev) {
        document.getElementById("reviewList").classList.remove("active");
        document.getElementById("DetailsPage").classList.add("active");

        //****CLEAR THE PAGE FROM PREVIOUS CARDS on the details page
        let cnt = document.querySelector(".card");

        if (cnt) {
            cnt.parentNode.removeChild(cnt);
        }


        let current = ev.currentTarget.parentNode,
            id = current.getAttribute('data-id');


        let div = document.createElement('div');
        div.className = "card";
        div.setAttribute("arrow-id", id);


        app.reviews.forEach(review => {
            if (id == review.id) {

                let p = document.createElement('p');
                let p1 = document.createElement('p');
                let div1 = document.createElement("div");
                div1.setAttribute("class", "stars");

                p.textContent = review.name;
                //p1.textContent = review.rating;
                let img = document.createElement('img');
                img.setAttribute("src", review.img);
                div.appendChild(p);
                div.appendChild(div1);
                div.appendChild(img);
                //create div
                let starDiv = document.createElement("div");
                starDiv.classList.add("stars");
                for (let i = 0; i < review.rating; i++) {
                    //create span
                    let span = document.createElement('span');
                    span.setAttribute("class", "star rated")
                    starDiv.appendChild(span);
                }
                div.appendChild(starDiv);


            }
        });
        let str = document.querySelector("stars");
        //div.appendChild(str);

        let i = document.getElementById("DetailsPage");
        i.appendChild(div);


    },




    //DELETE BUTTON
    deleteItem: function (ev) {
        let element = document.querySelector(".card");

        element.parentNode.removeChild(element);
        document.getElementById("reviewList").classList.add("active");
        document.getElementById("DetailsPage").classList.remove("active");

        let id = element.getAttribute('arrow-id');

        app.reviews.forEach((review, index) => {
            if (id == review.id) {
                app.reviews.splice(index, 1); // removing one member of array

            }

            localStorage.setItem(app.KEY, JSON.stringify(app.reviews));

            app.createList();

        });

    },


    cameraIsGood: function (imgURI) {
        document.getElementById('photo').src = imgURI;
        document.getElementById('msg').textContent = imgURI;
        app.photoTaken = true;
    },

    cameraBad: function (msg) {
        document.getElementById('msg').textContent = msg;
    },

    //CANCEL AND BACK BUTTON
    switchPage: function () {
        let addReview = document.getElementById("addReview");
        let reviewList = document.getElementById("reviewList");
        let details = document.getElementById("DetailsPage");

        if (addReview.className == "page active") {


            addReview.classList.remove("active");
            reviewList.classList.add("active");


        } else {
            details.classList.remove("active");
            reviewList.classList.add("active");
        }




    },

    updateStorage: function () {
        let str = JSON.stringify(app.reviews);
        localStorage.setItem(app.KEY, str);
    }



};









let loadEvent = ('deviceready' in document) ? 'deviceready' : 'DOMContentLoaded';
document.addEventListener(loadEvent, app.init);
