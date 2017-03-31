export class Video {
  constructor(
    public items: {},
    public id: string,
    public kind: string,
    public title: string,
    public channelTitle: string,
    public snippet: {},
    public resourceId: {},
    public videoId: string,
    public publishedAt: string,
    public thumbnails: {},
    public standard: {},
    public medium: {},
    public url: string,
    public width: number,
    public height: number,
    public viewCount: number,
    public duration: string,
    public prevPageToken: string,
    public nextPageToken: string
  ) { }
}
