export interface Tag {
	id: string;
	name: string;
	slug: string;
	createdAt: string;
}

export interface CreateTagPayload {
	name: string;
	slug: string;
}

export interface UpdateTagPayload extends Partial<CreateTagPayload> {}
