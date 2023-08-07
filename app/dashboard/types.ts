export type ServerVideo = {
    created_on: string | null;
    done: boolean;
    finished_videos: string[];
    id: string;
    og_link: string;
    status: "trimming" | "editing" | "to_review";
    style: string;
    updated_at: string | null;
    user_id: string;
    vid1: string;
    vid2: string | null;
    vid3: string | null;
    comment: {
        id: string;
        solved: boolean;
        text: string | null;
        video_id: string;
    }[];
};

export type NewVideoData = {
    ogLink: string;
    comment: string;
    vids: string[3];
};
