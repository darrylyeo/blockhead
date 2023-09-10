module default {
	type User {
		required property id -> int64 {
			constraint exclusive
		};
		index on (.id);

		required property sub -> str {
			constraint exclusive
		};
		multi link devices -> Device;
	};

	type Wallet {
		required property id -> uuid {
			constraint exclusive
		};
		multi link devices -> Device;
		multi link transactions -> Transaction;
	};

	type Device {
		required property id -> uuid {
			constraint exclusive
		};
		index on (.id);

		required property userId -> int64;
		required property walletId -> uuid;

		link user -> User;
		link wallet -> Wallet;
		multi link msgs -> Message;

		property createdAt -> datetime;
		property updatedAt -> datetime;
	};

	type Message {
		required property id -> int64 {
			constraint exclusive
		};
		index on (.id);

		required property deviceId -> uuid;
		index on (.deviceId);

		link device -> Device;

		optional property physicalDeviceId -> uuid;

		required property message -> str;

		optional property lastSeen -> datetime;
		index on (.lastSeen);

		property createdAt -> datetime;
		index on (.createdAt);

		property updatedAt -> datetime;
	};

	type Transaction {
		required property id -> uuid {
			constraint exclusive
		};
		index on (.id);

		required property status -> str;
		index on (.status);

		property createdAt -> datetime;
		index on (.createdAt);

		property lastUpdated -> datetime;
		index on (.lastUpdated);

		required property details -> str;
		multi link wallets -> Wallet;
	};
};
