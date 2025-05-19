type Database = {
  _id: string;
  name: string;
  connection_string: string;
  status?: "connected" | "disconnected" | "connecting";
  collections?: Array<any>;
  last_save?: string;
  message?: string;
  custom_name?: string;
  authentication_database: string;
  hourly_save?: boolean;
};

type DbSave = {
  _id: string;
  db_id: string;
  timestamp: string;
  manual: boolean;
};
