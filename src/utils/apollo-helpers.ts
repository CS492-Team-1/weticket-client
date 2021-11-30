import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type CancelReservationOutputKeySpecifier = ('error' | 'ok' | CancelReservationOutputKeySpecifier)[];
export type CancelReservationOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginOutputKeySpecifier = ('accessToken' | 'error' | 'ok' | LoginOutputKeySpecifier)[];
export type LoginOutputFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('cancelReservation' | 'login' | 'preemptSeat' | 'register' | 'reserveSeat' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	cancelReservation?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	preemptSeat?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	reserveSeat?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PreemptSeatOutputKeySpecifier = ('error' | 'ok' | 'reservation' | PreemptSeatOutputKeySpecifier)[];
export type PreemptSeatOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	reservation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('me' | 'reservation' | 'reservations' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	reservation?: FieldPolicy<any> | FieldReadFunction<any>,
	reservations?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RegisterOutputKeySpecifier = ('error' | 'ok' | 'user' | RegisterOutputKeySpecifier)[];
export type RegisterOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReservationKeySpecifier = ('id' | 'preemptedAt' | 'seats' | 'status' | 'time' | 'user' | ReservationKeySpecifier)[];
export type ReservationFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	preemptedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	seats?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReservationOutputKeySpecifier = ('error' | 'ok' | 'reservation' | ReservationOutputKeySpecifier)[];
export type ReservationOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	reservation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReservationsOutputKeySpecifier = ('error' | 'ok' | 'reservations' | ReservationsOutputKeySpecifier)[];
export type ReservationsOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	reservations?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReserveSeatOutputKeySpecifier = ('error' | 'ok' | 'reservation' | ReserveSeatOutputKeySpecifier)[];
export type ReserveSeatOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	reservation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('canceledReservationOnTime' | 'newReservationOnTime' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	canceledReservationOnTime?: FieldPolicy<any> | FieldReadFunction<any>,
	newReservationOnTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'reservations' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	reservations?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	CancelReservationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CancelReservationOutputKeySpecifier | (() => undefined | CancelReservationOutputKeySpecifier),
		fields?: CancelReservationOutputFieldPolicy,
	},
	LoginOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginOutputKeySpecifier | (() => undefined | LoginOutputKeySpecifier),
		fields?: LoginOutputFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PreemptSeatOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PreemptSeatOutputKeySpecifier | (() => undefined | PreemptSeatOutputKeySpecifier),
		fields?: PreemptSeatOutputFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RegisterOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RegisterOutputKeySpecifier | (() => undefined | RegisterOutputKeySpecifier),
		fields?: RegisterOutputFieldPolicy,
	},
	Reservation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReservationKeySpecifier | (() => undefined | ReservationKeySpecifier),
		fields?: ReservationFieldPolicy,
	},
	ReservationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReservationOutputKeySpecifier | (() => undefined | ReservationOutputKeySpecifier),
		fields?: ReservationOutputFieldPolicy,
	},
	ReservationsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReservationsOutputKeySpecifier | (() => undefined | ReservationsOutputKeySpecifier),
		fields?: ReservationsOutputFieldPolicy,
	},
	ReserveSeatOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReserveSeatOutputKeySpecifier | (() => undefined | ReserveSeatOutputKeySpecifier),
		fields?: ReserveSeatOutputFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};