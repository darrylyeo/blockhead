module default {
    type User {
        required property sub -> str {
            constraint exclusive
        };
        multi link devices -> Device;
    };

    type Wallet {
        required property walletId -> uuid {
            constraint exclusive
        };
        multi link devices -> Device;
        multi link transactions -> Transaction;
    };

    type Device {
        required property deviceId -> uuid {
            constraint exclusive
        };
        index on (.deviceId);

        required link user -> User;
        required link wallet -> Wallet;
        multi link msgs -> Message;

        property createdAt -> datetime;
        property updatedAt -> datetime;
    };

    type PhysicalDevice {
        required property physicalDeviceId -> uuid {
            constraint exclusive
        };
        index on (.physicalDeviceId);
    }

    type Message {
        required link device -> Device;

        optional link physicalDevice -> PhysicalDevice;

        required property message -> json;

        optional property lastSeen -> datetime;
        index on (.lastSeen);

        property createdAt -> datetime;
        index on (.createdAt);

        property updatedAt -> datetime;
    };

    type Transaction {
        required property transactionId -> uuid {
            constraint exclusive
        };
        index on (.transactionId);

        required property status -> str;
        index on (.status);

        property createdAt -> datetime;
        index on (.createdAt);

        property lastUpdated -> datetime;
        index on (.lastUpdated);

        required property details -> json;
        multi link wallets -> Wallet;
    };
};
