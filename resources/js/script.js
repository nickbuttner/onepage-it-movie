/* let search = document.getElementById("search");
 */

/* search.addEventListener("focusin", function () {
  document.getElementById("input-search").focus();
}); */

feather.replace();

var menu_mobile = document.querySelector(".menu-mobile");
var menu_content = document.querySelector(".menu-content");
menu_mobile.addEventListener("click", () => {
  menu_content.classList.toggle("visible");
});

var menu = document.getElementById("header");
/* var topOfmenu = menu.offsetTop;
 */
function sticky() {
  /*   console.log(topOfmenu, window.scrollY);
   */ if (window.scrollY >= 100) {
    menu.classList.add("sticky");
  }
}

window.addEventListener("scroll", sticky);

var glide = new Glide("#recommendations", {
  type: "carousel",
  startAt: 2,
  perView: 7,
  focusAt: "center",
  breakpoints: {
    800: {
      perView: 2,
    },
    480: {
      perView: 1,
    },
  },
});

fetch(
  "https://api.themoviedb.org/3/movie/474350?api_key=0bbc1db3bebeda7ff1056bb4144390ec"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (movie) {
    console.log(movie);

    //banner

    let banner = document.querySelector(".banner");
    let h1 = document.querySelector("h1");
    let year = document.querySelector(".year");

    banner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    h1.innerText = movie.title;

    movie_id = movie.id;
    let modal = document.querySelector("#modal");
    let trailerModal = document.querySelector(".modal-trailer");
    let playTrailer = document.querySelector("#playTrailer");
    let close = document.querySelector(".close");
    let video = document.querySelector("iframe");

    playTrailer.addEventListener("click", function () {
      close.classList.add("flex");
      modal.classList.add("flex");
      modal.classList.remove("none");
      close.classList.remove("none");
      console.log("movie id", movie_id);

      fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=0bbc1db3bebeda7ff1056bb4144390ec`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (video) {
          let videos = video.results;
          let iframe = document.createElement("iframe");
          iframe.classList.add("trailer");
          iframe.frameBorder = "0";
          iframe.setAttribute("allowFullScreen", "");

          let final = videos.find(function (t) {
            let f = t.name.includes("final") || t.name.includes("Final");
            return f;
          });
          if (final) {
            let urlTrailer = final.key;
            iframe.src = `https://www.youtube.com/embed/${urlTrailer}?&autoplay=1`;

            // console.log("final true", urlTrailer)
            // let urlTrailer = videos[x].final
          } else {
            let urlTrailer = videos[0].key;
            iframe.src = `https://www.youtube.com/embed/${urlTrailer}?&autoplay=1`;
            // console.log("else", urlTrailer)
            // let urlTrailer = videos[x].key
          }
          // console.log("videos ", videos[x].key)

          trailerModal.appendChild(iframe);

          if (videos.length > 1) {
            console.log("greater");
          }

          /*for (const videoId of videos){
                    let final = videos.find(function(t){
                        let f = t.name.includes("final") || t.name.includes("Final")
                        return f
                    })
                    console.log("final key", final.key)
                    if (final) {
                        
                        let urlTrailer = final.key
                        console.log("final true", urlTrailer)
                        // let urlTrailer = videos[x].final
                    } else {
                        let urlTrailer = videos[0].key
                        console.log("else", urlTrailer)

                        // let urlTrailer = videos[x].key
                    }
                    // console.log("videos ", videos[x].key)

                } */
          close.addEventListener("click", function () {
            if (iframe.parentNode == trailerModal) {
              trailerModal.removeChild(iframe);
            }
            modal.classList.add("none");
            modal.classList.remove("flex");
            close.classList.add("none");
            close.classList.remove("flex");
          });
          /* window.onclick = function(e){
                    if (e.target == modal) {
                        modal.classList.add("none")
                        modal.classList.remove("flex")
                        close.classList.add("none")
                        close.classList.remove("flex")
                        trailerModal.innerHTML = ""
                    }
                }   */
        });
    });
    fetch(
      "https://api.themoviedb.org/3/movie/474350/credits?api_key=0bbc1db3bebeda7ff1056bb4144390ec"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (credits) {
        console.log(credits);

        //overview
        let divPoster = document.querySelector(".poster");
        let poster = document.createElement("img");
        divPoster.appendChild(poster);
        poster.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        let p = document.querySelector(".overview");
        p.innerText = movie.overview;

        let crew = credits.crew;
        let director = crew.find(function (credit) {
          return credit.job === "Director";
        });

        let screen = crew.find(function (credit) {
          return credit.job === "Screenplay";
        });

        let novel = crew.find(function (credit) {
          return credit.job === "Novel";
        });

        let crew_list = [director, screen, novel];
        let role_list = ["Director", "Screenplay", "Novel"];
        let creditList = document.querySelector(".crew-list");
        console.log(crew_list);

        crew_list.forEach(function (i) {
          let li_crew = document.createElement("li");
          li_crew.tabIndex = 0;
          let link_crew = document.createElement("a");
          let name_crew = document.createElement("span");
          let role_crew = document.createElement("span");
          creditList.appendChild(li_crew);
          li_crew.appendChild(link_crew);
          link_crew.appendChild(name_crew);
          link_crew.appendChild(role_crew);
          name_crew.classList.add("name-crew");
          role_crew.classList.add("role-crew");
          name_crew.innerText = i.name;
          role_crew.innerText = i.job;
        });

        // genre

        let genreList = document.querySelector(".genre-list");

        let genres = movie.genres;

        console.log("generos ", genres);
        genres.forEach(function (i) {
          let genre = document.createElement("li");
          genre.tabIndex = 0;
          genreList.appendChild(genre);
          let link_genre = document.createElement("a");
          let id_genre = i.id;
          console.log(id_genre);
          let name_genre = i.name;
          let name_low = i.name.toLowerCase();
          console.log(name_genre);
          link_genre.innerText = name_genre;
          console.log(link_genre);
          link_genre.setAttribute(
            "href",
            `https://www.themoviedb.org/genre/${id_genre}-${name_low}/movie`
          );
          link_genre.setAttribute("target", "_blank");
          genre.appendChild(link_genre);
        });
        /* genres.forEach(function(i){
            let genre = document.createElement("li")
            genre.tabIndex = 0
            genreList.appendChild(genre)
            let link_genre = document.createElement("a")
            let id_genre = genres[i].id
            let name_genre = genres[i].name
            link_genre.innerHTML = name_genre
            // let name_lower = (genres[i].name).toLowerCase()
            link_genre.href = `https://www.themoviedb.org/genre/${id_genre}-${name_lower}/movie`
            genre.appendChild(link_genre)
            genre.addEventListener('click', function(){
                window.open(link_genre, `_blank`)
            })
        /* 
        for (var i = 0; i < genres.length; i++){
            console.log(i)
           
            })
        }   */

        // }    ) */

        // cast

        let castList = document.querySelector(".cast-list");
        let cast = credits.cast;

        for (var i = 0; i < 12; i++) {
          let item = document.createElement("li");
          item.tabIndex = 0;
          item.setAttribute("data-id", cast[i].id);
          let fig = document.createElement("figure");
          let cast_img = document.createElement("img");
          let caption = document.createElement("figcaption");
          let name_span = document.createElement("span");
          let char_span = document.createElement("span");

          item.addEventListener("click", function () {
            let id = this.getAttribute("data-id");
            fetch(
              `https://api.themoviedb.org/3/person/${id}?api_key=0bbc1db3bebeda7ff1056bb4144390ec`
            )
              .then(function (response) {
                return response.json();
              })
              .then(function (url) {
                console.log(url);
                window.open(
                  `https://www.imdb.com/name/${url.imdb_id}`,
                  "_blank"
                );
              });
          });

          cast_img.src = `https://image.tmdb.org/t/p/original/${cast[i].profile_path}`;
          castList.appendChild(item);
          item.appendChild(fig);
          fig.appendChild(cast_img);
          fig.appendChild(caption);
          caption.appendChild(name_span);
          caption.appendChild(char_span);
          // link.href = `https://api.themoviedb.org/3/person${cast[i].id}`

          // link.appendChild()
          char = cast[i].character;
          name_span.innerText = cast[i].name;
          char_span.innerText = cast[i].character;
        }
      }); // creedit fetch

    // poster fetch
    fetch(
      "https://api.themoviedb.org/3/movie/474350/images?api_key=0bbc1db3bebeda7ff1056bb4144390ec"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (imgs) {
        console.log("imgs", imgs);
        let posters = imgs.posters;

        console.log("POSTER", posters);

        for (var q = 0; q < 8; q++) {
          let list_gallery = document.querySelector(".images-showcase");
          let item_gallery = document.createElement("li");
          let img_poster = document.createElement("img");

          img_poster.src = `https://image.tmdb.org/t/p/original/${posters[q].file_path}`;
          item_gallery.classList.add("photo");
          img_poster.alt = "poster film";
          img_poster.title = "poster film";

          list_gallery.appendChild(item_gallery);
          item_gallery.appendChild(img_poster);
        }
      }); // posters fetch

    fetch(
      "https://api.themoviedb.org/3/movie/474350/reviews?api_key=0bbc1db3bebeda7ff1056bb4144390ec"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (reviewsobj) {
        let reviews = reviewsobj.results;
        console.log(reviews);
        reviews.forEach(function (review) {
          let review_item = document.createElement("div");
          let reviews_box = document.querySelector(".review-wrapper");
          let review_title = document.createElement("cite");
          let review_content = document.createElement("blockquote");
          let btn = document.createElement("button");
          let link_review = document.createElement("a");
          link_review.href = `https://www.themoviedb.org/review/${review.id}`;

          btn.innerText = "See more";
          review_item.classList.add("review");
          review_item.setAttribute("data-id", review.id);
          review_title.innerText = `A review by ${review.author}`;
          let text = review.content;
          let edited_text = [text.slice(0, 150)];
          review_content.innerText = edited_text;
          review_item.classList.add("col");
          review_item.classList.add("span-1-of-4");
          reviews_box.appendChild(review_item);
          review_item.appendChild(link_review);
          link_review.appendChild(review_title);
          review_item.appendChild(review_content);
          if (text.length > 150) {
            review_item.appendChild(btn);
          }

          btn.addEventListener("click", function () {
            window.open(`https://www.themoviedb.org/review/${review.id}`);
          });
        });
      }); // review fetch

    fetch(
      "https://api.themoviedb.org/3/movie/474350/recommendations?api_key=0bbc1db3bebeda7ff1056bb4144390ec"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (recom) {
        let recommendations = recom.results;

        let carousel_list = document.querySelector("#carousel_list");
        // console.log(`https://image.tmdb.org/t/p/original${recommendations[0].poster_path}`)

        recommendations.forEach(function (recommendation, index) {
          let bullet_parent = document.querySelector("#carousel_bullets");
          let bullet = document.createElement("button");

          let carousel_item = document.createElement("li");
          let link_recommendation = document.createElement("a");
          let fig_carousel = document.createElement("figure");
          let img_carousel = document.createElement("img");
          let caption_carousel = document.createElement("figcaption");
          let span_title_carousel = document.createElement("span");
          let span_vote_carousel = document.createElement("span");
          let screen = window.matchMedia("(max-widht: 800px)");

          span_title_carousel.classList.add("title-recommendation");
          span_vote_carousel.classList.add("vote-recommendation");
          link_recommendation.href = `https://www.themoviedb.org/movie/${recommendation.id}`;
          link_recommendation.setAttribute("target", "_blank");
          bullet.classList.add("glide__bullet");
          bullet.setAttribute("data-glide-dir", `=${index}`);
          // img_carousel.srcset = `https://image.tmdb.org/t/p/w250_and_h141_face${recommendation.poster_path} w250, https://image.tmdb.org/t/p/w500_and_h282_face${recommendation.poster_path} w500`
          img_carousel.src = `https://image.tmdb.org/t/p/w250_and_h141_face${recommendation.poster_path}`;
          img_carousel.classList.add("carousel_posters");
          img_carousel.alt = `poster film ${recommendation.original_title}`;
          span_title_carousel.innerText = `${recommendation.title}`;
          span_vote_carousel.innerText = `${recommendation.vote_average}`;

          // img.srcset = `https://image.tmdb.org/t/p/original/${recommendation.})`
          // img_carousel.src = `https://image.tmdb.org/t/p/original/${recommendation.poster_path}`
          carousel_item.classList.add("glide__slide");

          bullet_parent.appendChild(bullet);
          carousel_list.appendChild(carousel_item);
          carousel_item.appendChild(link_recommendation);
          link_recommendation.appendChild(fig_carousel);
          fig_carousel.appendChild(img_carousel);
          fig_carousel.appendChild(caption_carousel);
          caption_carousel.appendChild(span_title_carousel);
          caption_carousel.appendChild(span_vote_carousel);
        });

        glide.mount();
      }); // recommendation fetch
  }); // movie fetch
