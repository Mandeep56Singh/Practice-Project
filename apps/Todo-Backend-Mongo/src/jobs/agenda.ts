import { Agenda } from "@hokify/agenda";

const mongodbUrl = process.env.DATABASE_URL as string;
const agenda = new Agenda({
  db: {
    address: mongodbUrl,
  },
});

export default agenda;
