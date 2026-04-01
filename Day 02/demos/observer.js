class YoutubeChannel {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }
  unsubscribe(user) {
    this.subscribers = this.subscribers.filter((u) => u != user);
  }

  uploadVideo(title) {
    // Nofiy subscribers
    this.subscribers.forEach((u) => u.NotifyMe(title, this.name));
  }
}

class YoutubeUser {
  constructor(userName, email) {
    this.userName = userName;
    this.email = email;
  }
  NotifyMe(title, channelName) {
    console.log(`hi ${this.userName}, channle ${channelName} Upload new Video : ${title}`);
  }
}

let channel1 = new YoutubeChannel("ABC");
let u1 = new YoutubeUser("ali", "ali@gmail.com");
let u2 = new YoutubeUser("omar", "omar@gmail.com");

channel1.subscribe(u1);
channel1.subscribe(u2);
channel1.unsubscribe(u2);

channel1.uploadVideo('Video 1')
