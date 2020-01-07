import { followService } from "../services/followService";

export default class ProfileController {
  static async follow(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;

      const followed = await followService.create({
        userId: id,
        followerId: userId
      });

      res.status(201).send({
        status: 201,
        message: "follow successful",
        followed
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  static async unFollow(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;

      await followService.delete({
        userId: id,
        followerId: userId
      });

      res.status(200).send({
        status: 200,
        message: "un-follow successful",
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  static async getFollowers(req, res) {
    try {
      const { userId} = req;
      const include = [{
        model: User,
        as: 'followers',
      }];
      const followers = await followService.findAll({ followerId: userId }, include);

      res.status(200).send({
        status: 200,
        message: "followers found",
        followers
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  static async getFollowing(req, res) {
    try {
      const { userId} = req;
      const include = [{
          model: User,
          as: 'following',
        }];

      const following = await followService.findAll({ userId }, include);

      res.status(200).send({
        status: 200,
        message: "following found",
        following
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }
}
