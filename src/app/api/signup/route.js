import mongoose from 'mongoose';
import { User } from '../../../lib/model/user';
import { connectionStr } from '../../../lib/db';
import { internalServerError } from '../../../lib/errors/server';
import { NextResponse } from 'next/server';

// Get User with username and password
export async function POST(request) {
	try {
		const payload = await request.json();
		await mongoose.connect(connectionStr);
		let user = new User(payload);
		await user.save();
		return NextResponse.json({ user }, { status: 200 });
	} catch {
		internalServerError();
	}
}
