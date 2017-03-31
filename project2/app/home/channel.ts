export class Channel {
  constructor(
    public statistics: {}, 
    public subscriberCount: number,
    public videoCount: number,
    public viewCount: number) { }
}
