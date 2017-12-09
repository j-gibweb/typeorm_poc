import {
  getConnection
} from "typeorm";

import {Post} from "../entity/Post";

export class PostController {
  constructor() {}

  async all(request, response, next) {
    const dbName = request.headers['target-db'];
    return getConnection(dbName).manager.find(Post);
  }

  async one(request, response, next) {
    const dbName = request.headers['target-db'];
    // return this.postRepository.findOneById(request.params.id);
    return getConnection(dbName).manager.findOneById(Post, request.params.id);
  }

  async save(request, response, next) {
    // return this.postRepository.save(request.body);
  }

  async remove(request, response, next) {
    // await this.postRepository.removeById(request.params.id);
  }

}
