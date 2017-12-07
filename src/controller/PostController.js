import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";

export class PostController {
  constructor() {
    this.postRepository = getRepository(Post);
  }

  async all(request, response, next) {
      return this.postRepository.find();
  }

  async one(request, response, next) {
      return this.postRepository.findOneById(request.params.id);
  }

  async save(request, response, next) {
      return this.postRepository.save(request.body);
  }

  async remove(request, response, next) {
      await this.postRepository.removeById(request.params.id);
  }

}