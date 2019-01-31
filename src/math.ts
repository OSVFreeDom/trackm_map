namespace TrackM {
    export class Vector2 {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        distanceTo(other: Vector2) {
            return Math.sqrt(this.distanceToSquared(other));
        }

        distanceToSquared(other: Vector2) {
            return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
        }

        length(): number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        angle(): number {
            return (Math.atan2(this.x, this.y) / Math.PI) * 180;
        }
    }

    export class Vector3 {
        x: number;
        y: number;
        z: number;

        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        distanceTo(other: Vector3) {
            return Math.sqrt(this.distanceToSquared(other));
        }

        distanceToSquared(other: Vector3) {
            return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) + Math.pow(this.z - other.z, 2);
        }

        length(): number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        }

        angle(): number {
            return (Math.atan2(this.x, this.y) / Math.PI) * 180;
        }
    }
}