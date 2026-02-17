/**
 * In-memory ActivityRecorder prototype to instantiate the architecture.
 * Real implementation should connect to native GPS services + SQLite.
 */
export class ActivityRecorder {
  constructor() {
    this.session = null;
  }

  start({ sport = 'run', startedAt = Date.now() } = {}) {
    if (this.session) {
      throw new Error('Activity recording already in progress');
    }

    this.session = {
      id: `act_${startedAt}`,
      sport,
      startedAt,
      points: []
    };

    return this.session.id;
  }

  addTrackPoint(point) {
    if (!this.session) {
      throw new Error('No activity in progress');
    }
    this.session.points.push({ ...point });
  }

  stop(endedAt = Date.now()) {
    if (!this.session) {
      throw new Error('No activity in progress');
    }

    const activity = {
      id: this.session.id,
      sport: this.session.sport,
      startedAt: this.session.startedAt,
      endedAt,
      trackpointCount: this.session.points.length
    };

    this.session = null;
    return activity;
  }
}
