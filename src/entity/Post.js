import {
	Entity, 
	PrimaryGeneratedColumn, 
	PrimaryColumn,
	Column, 
	ManyToMany, 
	JoinTable
} from "typeorm";
import {Category} from "./Category";

@Entity()
export class Post {
	
	@PrimaryGeneratedColumn('uuid')
	// @PrimaryColumn()
	id = undefined;
	
	@Column("varchar")
	title = "";
	
	@Column("text")
	text = "";
	
	@ManyToMany(
		type => Category, 
		{
			cascadeInsert: true,
			eager: true
		}
	)
	@JoinTable()
	categories = undefined;

}
