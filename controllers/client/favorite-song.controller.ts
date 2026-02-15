import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
    deleted: false,
  });

  for (const favorite of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: favorite.songId,
    });

    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId,
    });

    favorite["infoSong"] = infoSong;

    favorite["infoSinger"] = infoSinger;
  }

  // console.log(favoriteSongs);

  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs,
  });
};