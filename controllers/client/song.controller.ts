import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like");

  console.log(topic._id);

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });

    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const song = await Song.findOne({
    slug: req.params.slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    // userId: "",
    songId: song.id,
  });

  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic,
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong = req.params.idSong;
  const typeLike = req.params.typeLike;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  const newLike: number = typeLike == "yes" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );
  // like: ["id_user_1", "id_user_2"]

  res.json({
    code: 200,
    message: "Thành công!",
    like: newLike,
  });
};

// [PATCH] /songs/like/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong = req.params.idSong;
  const typeFavorite = req.params.typeFavorite;

  switch (typeFavorite) {
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong,
      });
      if (!existFavoriteSong) {
        const favoriteSong = new FavoriteSong({
          // userId: "",
          songId: idSong,
        });
        await favoriteSong.save();
      }

      break;

    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong,
      });

      break;

    default:
      break;
  }

  res.json({
    code: 200,
    message: "Thành công!",
  });
};