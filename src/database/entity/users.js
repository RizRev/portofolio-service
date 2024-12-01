import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id;

  @Column()
  username;

  @Column()
  password;

  @Column({ unique: true })
  email;

  @Column({ nullable: true })
  photo;

}
