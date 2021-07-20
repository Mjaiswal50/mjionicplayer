/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-var */
// eslint-disable-next-line @typescript-eslint/no-shadow
// eslint-disable-next-line @typescript-eslint/no-shadow
import { Component, OnChanges, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private i = new BehaviorSubject<number>(0);
  j = 1;
  mainimgi = 'http://direct.rhapsody.com/imageserver/v2/albums/';
  mainimgj = '';
  mainimgk = '/images/600x600.jpg';
  mainimg: any;
  fav = false;
  autoplayvar = true;
  songduration: any;
  paushplaybtn: any;
  albName: any;
  isPlaying = false;
  currentsongduration: any;
  albId: any;
  trackz: any;
  isRepeat = false;
  shuffler = false;
  visualno=2;
  isvisualchange=true;
  constructor() {
    this.i.next(this.j);
    const getTopTracks = $.get('xxx');
    this.i.subscribe(temp => {
       getTopTracks.then((response) => {
         const nonsecureUrl: string = response.tracks[this.j].previewURL;
        const secureUrl: string = 'https' + nonsecureUrl.slice(4);
        this.trackz = secureUrl;
         if ((response.tracks[this.j].name).length > 14) {
           this.albName = ((response.tracks[this.j].name).slice(0, 14)) + '..';
        }
        else {
           this.albName = ((response.tracks[this.j].name));
        }

        var player = $('#player2')[0];
        this.songduration = 30;
        setTimeout(function() {
          player.load();
          player.play();
        }, 0);
         this.albId = response.tracks[this.j].albumId;
         console.log(response.tracks[this.j]);
        this.mainimg = this.mainimgi + this.albId + this.mainimgk;
      });
    }
    );

    $(window).on('load', () => {
      var player = $('#player2')[0];
      this.currentsongduration = 0;

      var player = $('#player2')[0];
      player.addEventListener('ended', () => {
        if (!this.isRepeat) {
          this.songnext();
        }
        else {
          player.load();
          setTimeout(function() {
            player.play();
          }, 0);
        }

      });
      player.addEventListener('timeupdate', () => {
        player = $('#player2')[0];
        this.currentsongduration = player.currentTime;
      });
    });
  }

  songnext() {
    if (!this.shuffler) {
      if (this.j < 10) {
        this.i.next(this.j++);
        var player = $('#player2')[0];
        player.load();
        this.isPlaying = true;
        setTimeout(function() {
          player.play();
        }, 0);
      }
      else {
        this.j = 0;
        this.i.next(this.j);
      }
    } else {
      this.j = Math.floor(Math.random() * 101) % 7;
      this.i.next(this.j);
    }

  }
  songprev() {
    if (!this.shuffler) {
      if (this.j !== 0) {
        this.j = this.j - 1;
        this.i.next(this.j);
        var player = $('#player2')[0];
        player.load();
        this.isPlaying = true;
        setTimeout(function() {
          player.play();
        }, 0);
      } else {
        this.j = 9;
        this.i.next(this.j);
      }
    } else {
      this.j = Math.floor(Math.random() * 101) % 7;
      this.i.next(this.j);
    }
  }

  setRepeat() {
    this.isRepeat = !this.isRepeat;
    if (this.isRepeat === true) {
      this.shuffler = false;
    }
  }

  playpause() {
    const player = $('#player2')[0];
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      setTimeout(function() {
        player.play();
      }, 0);
      const rangez = $('#rangeid')[0];
      this.audiodrag(this.currentsongduration);
    }
    else {
      player.pause();
    }
  }

  audiodrag(c) {
    var player = $('#player2')[0];
    if (this.isplayingnow) {
      this.isPlaying = true;
      var player = $('#player2')[0];
      player.currentTime = c;
      this.currentsongduration = c;
      if (player.currentTime === 30) {
        $('.nexter')[0].click();
      }
    } else {
      this.isPlaying = false;
    }
  }

  favchange() {
    this.fav = !this.fav;
    this.isvisualchange=!this.isvisualchange;
  }

  shufflelist() {
    this.shuffler = !this.shuffler;
  }

  isplayingnow() {
    const player = $('#player2')[0];
    if ( !player.paused) {
      this.isPlaying = true;
      return true;
    }
    else {
      this.isPlaying = false;
      return false;
    }
  }

  visualchange(){
    if(this.isvisualchange){
      var r = (Math.floor(Math.random() * 10) % 3);
      if (r !== this.visualno) {
        this.visualno = r;
        return;
      }
      else {
        this.visualchange();
      }
    }

    }


}



