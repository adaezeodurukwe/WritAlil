import { followService } from '../services/followService';
import models from '../database/models';

const { User } = models;

/**
 * @class ProfileController
 */
export default class ProfileController {
  /**
   * @method follow
   * @param {*} req
   * @param {*} res
   * @returns {object} followed
   */
  static async follow(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;
      const dataObject = {
        userId: id,
        followerId: userId
      };
      const [followed, isNewEntry] = await followService.findOrCreate(dataObject, dataObject);
      if (!isNewEntry) {
        return res.status(400).send({
          status: 400,
          message: 'you already follow this user',
        });
      }

      return res.status(201).send({
        status: 201,
        message: 'follow successful',
        followed
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method unfollow
   * @param {*} req
   * @param {*} res
   * @returns {object} unfollowed
   */
  static async unFollow(req, res) {
    try {
      const { userId, params } = req;
      const { id } = params;

      await followService.delete({
        userId: id,
        followerId: userId
      });

      return res.status(200).send({
        status: 200,
        message: 'un-follow successful',
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method getFollowers
   * @param {*} req
   * @param {*} res
   * @returns {object} followers
   */
  static async getFollowers(req, res) {
    try {
      let followers = [];
      const { userId } = req;
      const include = [{
        model: User,
        as: 'followers',
      }];

      const users = await followService.findAll(include, null, null, { followerId: userId });
      if (users[0]) {
        followers = users.map((user) => user.followers);
      }
      res.status(200).send({
        status: 200,
        message: 'followers found',
        followers
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }

  /**
   * @method getFollowling
   * @param {*} req
   * @param {*} res
   * @returns {object} following
   */
  static async getFollowing(req, res) {
    try {
      let following = [];
      const { userId } = req;
      const include = [{
        model: User,
        as: 'following',
      }];

      const users = await followService.findAll(include, null, null, { userId });

      if (users[0]) {
        following = users.map((user) => user.following);
      }

      res.status(200).send({
        status: 200,
        message: 'following found',
        following
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'something went wrong',
        error
      });
    }
  }
}
