import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ava Rodriguez', username: 'ava_runs', email: 'ava@mergington.edu', grade: 10 },
      { name: 'Liam Chen', username: 'liam_lifts', email: 'liam@mergington.edu', grade: 11 },
      { name: 'Maya Patel', username: 'maya_moves', email: 'maya@mergington.edu', grade: 9 },
      { name: 'Noah Williams', username: 'noah_walks', email: 'noah@mergington.edu', grade: 12 },
    ]);

    const teams = await Team.create([
      { name: 'Peak Performers', motto: 'Small steps, strong finish', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', motto: 'Find your next summit', members: [users[2]._id, users[3]._id] },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, points: 64, completedAt: new Date('2026-08-25') },
      { user: users[1]._id, type: 'strength', durationMinutes: 40, points: 80, completedAt: new Date('2026-08-26') },
      { user: users[2]._id, type: 'walking', durationMinutes: 45, points: 45, completedAt: new Date('2026-08-26') },
      { user: users[3]._id, type: 'running', durationMinutes: 28, points: 56, completedAt: new Date('2026-08-27') },
    ]);

    await Leaderboard.create([
      { user: users[1]._id, team: teams[0]._id, points: 280, rank: 1 },
      { user: users[0]._id, team: teams[0]._id, points: 240, rank: 2 },
      { user: users[3]._id, team: teams[1]._id, points: 215, rank: 3 },
      { user: users[2]._id, team: teams[1]._id, points: 190, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Campus Cardio Circuit',
        description: 'A balanced circuit using short cardio intervals and recovery walks.',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Jog in place', 'Step-ups', 'Recovery walk'],
      },
      {
        title: 'Strength Starter',
        description: 'A full-body routine focused on safe form and controlled movement.',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        title: 'Post-Class Mobility',
        description: 'Gentle stretches to reset after a long school day.',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        exercises: ['Hip flexor stretch', 'Shoulder circles', 'Forward fold'],
      },
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
