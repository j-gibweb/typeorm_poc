import {
	Entity, 
	PrimaryGeneratedColumn, 
	PrimaryColumn,
	Column, 
	ManyToMany, 
	JoinTable
} from "typeorm";
import {Category} from "./Category";

export function getPost(targetDb) {

	@Entity()
	class Post {
		
		@PrimaryGeneratedColumn('uuid')
		// @PrimaryColumn('uuid')
		id = undefined;
		
		@Column("varchar")
		title = "";
		
		@Column("text")
		text = "";
		
		@ManyToMany(type => Category, { cascadeInsert: true })
		@JoinTable()
		categories = undefined;
		
	}

	return Post
}