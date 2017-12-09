import {
  getConnection
} from "typeorm";

import {Post} from "../entity/Post";

export class PostController {
  // can pull this out into parent class and call super(...args)
  constructor(dbName) {
    this.manager = getConnection(dbName).manager;
    this.repository = this.manager.connection.getRepository(Post);
  }

  async all(request, response, next) {
    return this.manager.find(Post);
  }

  async one(request, response, next) {
    return this.manager.findOneById(Post, request.params.id);
  }

  async save(request, response, next) {
    let post = this.repository.create(request.body);
    return this.repository.save(post);
  }

  async remove(request, response, next) {
    await this.repository.removeById(request.params.id);
    return {message: "Post Deleted"}
  }

}
