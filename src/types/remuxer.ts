import { TrackSet } from './track';
import { DemuxedAudioTrack, DemuxedAvcTrack, DemuxedTrack, MetadataSample, UserdataSample, DemuxedID3Track, DemuxedTextTrack } from './demuxer';
import { SourceBufferName } from './buffer';

export interface Remuxer {
  remux(audioTrack: DemuxedAudioTrack,
        videoTrack: DemuxedAvcTrack,
        id3Track: DemuxedID3Track,
        textTrack: DemuxedTextTrack,
        timeOffset: number,
        accurateTimeOffset: boolean
  ): RemuxerResult
  resetInitSegment(initSegment: Uint8Array, audioCodec: string | undefined, videoCodec: string | undefined): void
  resetTimeStamp(defaultInitPTS): void
  resetNextTimestamp() : void
  destroy() : void
}

export interface RemuxedTrack {
    data1: Uint8Array
    data2?: Uint8Array
    startPTS: number
    endPTS: number
    startDTS: number
    endDTS: number
    type: SourceBufferName
    hasAudio: boolean
    hasVideo: boolean
    nb: number
    transferredData1?: ArrayBuffer
    transferredData2?: ArrayBuffer
    dropped?: number
}

export interface RemuxedMetadata {
    samples: MetadataSample[]
}

export interface RemuxedUserdata {
  samples: UserdataSample[]
}

export interface RemuxerResult {
    audio?: RemuxedTrack
    video?: RemuxedTrack
    text?: RemuxedUserdata
    id3?: RemuxedMetadata
    initSegment?: InitSegmentData
}

export interface InitSegmentData {
    tracks?: TrackSet
    initPTS?: number
}
