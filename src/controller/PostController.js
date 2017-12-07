import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {getPost} from "../entity/Post";

export class PostController {
  constructor(targetDb) {
    // console.log(targetDb)
    this.postRepository = getRepository(getPost());
  }

  async all(request, response, next) {
    // console.log(request.headers['target-db'])
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