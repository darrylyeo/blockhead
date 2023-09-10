CREATE MIGRATION m1ceznlw7rucheaxuf75ooemeu5zyhqei4exxwpqbcqxllrmeo2boq
    ONTO initial
{
  CREATE TYPE default::Device {
      CREATE REQUIRED PROPERTY deviceId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.deviceId);
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY updatedAt: std::datetime;
  };
  CREATE TYPE default::PhysicalDevice {
      CREATE REQUIRED PROPERTY physicalDeviceId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.physicalDeviceId);
  };
  CREATE TYPE default::Message {
      CREATE REQUIRED LINK device: default::Device;
      CREATE PROPERTY createdAt: std::datetime;
      CREATE INDEX ON (.createdAt);
      CREATE OPTIONAL PROPERTY lastSeen: std::datetime;
      CREATE INDEX ON (.lastSeen);
      CREATE OPTIONAL LINK physicalDevice: default::PhysicalDevice;
      CREATE REQUIRED PROPERTY message: std::json;
      CREATE PROPERTY updatedAt: std::datetime;
  };
  ALTER TYPE default::Device {
      CREATE MULTI LINK msgs: default::Message;
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK devices: default::Device;
      CREATE REQUIRED PROPERTY sub: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Device {
      CREATE REQUIRED LINK user: default::User;
  };
  CREATE TYPE default::Wallet {
      CREATE MULTI LINK devices: default::Device;
      CREATE REQUIRED PROPERTY walletId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Device {
      CREATE REQUIRED LINK wallet: default::Wallet;
  };
  CREATE TYPE default::Transaction {
      CREATE PROPERTY createdAt: std::datetime;
      CREATE INDEX ON (.createdAt);
      CREATE REQUIRED PROPERTY transactionId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.transactionId);
      CREATE REQUIRED PROPERTY status: std::str;
      CREATE INDEX ON (.status);
      CREATE PROPERTY lastUpdated: std::datetime;
      CREATE INDEX ON (.lastUpdated);
      CREATE MULTI LINK wallets: default::Wallet;
      CREATE REQUIRED PROPERTY details: std::json;
  };
  ALTER TYPE default::Wallet {
      CREATE MULTI LINK transactions: default::Transaction;
  };
};
