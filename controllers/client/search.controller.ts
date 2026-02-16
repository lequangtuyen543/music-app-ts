import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword: string = `${req.query.keyword}`;

  let newSongs = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    // Tạo ra slug không dấu, có thêm dấu - ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    });

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
      });

      newSongs.push({
        id: song.id,
        title: song.title,
        avatar: song.avatar,
        like: song.like,
        slug: song.slug,
        infoSinger: {
          fullName: infoSinger.fullName,
        },
      });
    }
  }

  if (type == "result") {
    res.render("client/pages/search/result", {
      pageTitle: `kết quả: ${keyword}`,
      keyword: keyword,
      songs: newSongs,
    });
  } else {
    res.json({
      code: 200,
      message: "Thành công!",
      songs: newSongs,
    });
  }
};