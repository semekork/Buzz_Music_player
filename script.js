/*
design by Semekor.k
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Fire Babe",
          artist: "Stormzy",
          cover: "https://i.scdn.co/image/ab67616d0000b273180bb1d6f9b8d3ad2ca92647",
          source: "https://www.xclusivesongs.com/wp-content/uploads/2022/11/Stormzy_-_Firebabe.mp3",
          url: "https://www.youtube.com/watch?v=F0CnKnCjJZ4",
          favorited: false
        },
        {
          name: "Likor",
          artist: "KiDi",
          cover: "https://www.halmblog.com/storage/2023/07/likor.jpeg",
          source: "https://www.val9ja.com/wp-content/uploads/2023/07/KiDi_Ft_Stonebwoy_-_Likor.mp3",
          url: "https://www.youtube.com/watch?v=pq7xrr3QXJY",
          favorited: true
        },
        {
          name: "Lonely At The Top",
          artist: "Asake",
          cover: "https://i1.sndcdn.com/artworks-QQ1S7dhvPBZm-0-t500x500.jpg",
          source: "https://www.xclusivepop.com/wp-content/uploads/2023/06/Asake_-_Lonely_At_The_Top.mp3",
          url: "https://www.youtube.com/watch?v=3JQA7W_dLUg",
          favorited: false
        },
        {
          name: "Reason",
          artist: "Omah Lay",
          cover: "https://trendysongz.com/images/Omah-Lay-Boy-Alone-Album-artwork2.jpg",
          source: "https://www.xclusivepop.com/wp-content/uploads/2023/06/Omah_Lay_-_Reason.mp3",
          url: "https://www.youtube.com/watch?v=vmytMK1ZjcY",
          favorited: false
        },
        {
          name: "Sprinter",
          artist: "Dave & Central Cee",
          cover: "https://e.snmc.io/i/600/s/3dfa35bccefd580ed4145c4eb145faa5/11022909/dave-and-central-cee-sprinter-Cover-Art.jpg",
          source: "https://zacknation.net/wp-content/uploads/2023/06/Dave-Sprinter.mp3",
          url: "https://www.youtube.com/watch?v=pSY3i5XHHXo",
          favorited: true
        },
        {
          name: "All My Life (feat. J. Cole)",
          artist: "Lil Durk",
          cover: "https://i.scdn.co/image/ab67616d0000b2737c173b0dc64913d4635e3594",
          source: "https://files.ceenaija.com/uploads/music/2023/05/Lil-Durk-feat-J-Cole-All-My-Life-(CeeNaija.com).mp3",
          url: "https://www.youtube.com/watch?v=Z4N8lzKNfy4",
          favorited: false
        },
        {
          name: "Terminator",
          artist: "King Promise",
          cover: "https://www.ghanasong.com/wp-content/uploads/2023/05/King-Promise-Terminator-www.Ghanasong.com_.jpg",
          source: "https://www.ghanasong.com/wp-content/uploads/2023/05/King-Promise-Terminator-www.Ghanasong.com_.mp3",
          url: "https://www.youtube.com/watch?v=NPCC02SaJVg",
          favorited: true
        },
        {
          name: "Into The Future",
          artist: "Stonebwoy",
          cover: "https://grungecake.com/wp-content/uploads/2023/04/stonebwoy-5th-dimension-promo-picture-grungecake-thumbnail.jpeg",
          source: "https://www.ghanasong.com/wp-content/uploads/2023/05/Stonebwoy-Into-The-Future-www.Ghanasong.com_.mp3",
          url: "https://www.youtube.com/watch?v=abff8ElTQuA",
          favorited: false
        },
        {
          name: "Try Me",
          artist: "Sarkodie",
          cover: "https://i.scdn.co/image/ab67616d0000b273d122e70ccbc3c5fa5fa4bc00",
          source: "https://www.ghanasong.com/wp-content/uploads/2023/06/Sarkodie-Try-Me-www.Ghanasong.com_.mp3",
          url: "https://www.youtube.com/watch?v=g3p2ShkljP0&t=2s",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});