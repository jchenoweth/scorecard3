export class Course {
    par: number[]= [];
    holeDescription: string[] = [];

    constructor(public name: string) {
        this.par = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.holeDescription [0] =
          `A downhill tee shot that should favor the left side of
          the fairway especially if you are hoping to hit the green
          in two. Subsequent approaches will be to a green only 23
          yards deep and heavily guarded by bunkers on both sides.
          A miss left or long of the green will be penalized due to
          a severe slope.`;
        this.holeDescription [1] =
          `This green slopes from back to front so attempt to leave
          your tee shot below the hole. Avoid going long and left as
          hard pan tends to kick the ball to less than desirable areas.
          The green is hefty so dial in your yardage before you pull the
          trigger.`;
        this.holeDescription [2] =
          `Left or Right? Just don’t find the bunker straight ahead as
          it tends to make your approach shots longer than planned. We
          recommend that shorter hitters stay right of the closest pond.
          Be aware of the greenside bunker and water right on your
          approach shots to this flat but tricky green.`;
        this.holeDescription [3] =
          `A well designed golf hole whose fairway is protected by a trap
          left and a forest of pines right that come into play quicker
          than most hope. The green, which has some good undulation, is
          quite narrow but has a depth of 33 yards. Try to keep the
          approach shots under the hole as it slopes mostly back to front.`;
        this.holeDescription [4] =
          `An uphill tee shot that’s nicely protected by two traps. The
          green is somewhat flat and is 34 yards deep so the yardage on
          the tee box will vary greatly depending on pin location. If you
          haven’t done so go back to your bag and get a longer club to
          accommodate the elevation change.`;
        this.holeDescription [5] =
          `A nice opportunity for a good score on this shorter par 4;
          long hitters can give the green a go! It’s best to keep your
          drive left to avoid the large valley running downhill to the
          right. The approach to the green will be tricky as your shot
          will more than likely be blind and uphill. A miss long and left
          can find the hazard behind the green.`;
        this.holeDescription [6] =
          `Let’s bring out the controlled slice for righties and
          controlled hooks for lefties. This drive will test your distance
            control as too short won’t make the corner whereas too long
            will find trouble. The 150 maker on the map is a great
            indicator for your distance needed from the tee. Approach
            shots will be a bit uphill and stay clear of the slope that
            falls away from the green on the right.`;
        this.holeDescription [7] =
          `Historically one of the hardest greens on the course to hold.
          Too short of a drive and you won’t make it past the upslope;
          too long and you’re finding more issues than opportunities.
          Aim for the middle of the green, any misses should favor short
          and left to have the greatest chance for a par.`;
        this.holeDescription [8] =
          `Trouble is found to the right for the entire hole consisting
          of trees, traps and hazards. We’d say stay left on the drive
          but a bunker lingers therefore, the best position would be to
          simply split the fairway. Avoid the bunker lurking short and
          right of the green as it’s the deepest trap on the course. The
          green is quite immense with a depth of 38 yards and plays more
          uphill than meets the eye.`;
        this.holeDescription [9] = `Hole 10 description...`;
        this.holeDescription [10] = `Hole 11 description...`;
        this.holeDescription [11] = `Hole 12 description...`;
        this.holeDescription [12] = `Hole 13 description...`;
        this.holeDescription [13] = `Hole 14 description...`;
        this.holeDescription [14] = `Hole 15 description...`;
        this.holeDescription [15] = `Hole 16 description...`;
        this.holeDescription [16] = `Hole 17 description...`;
        this.holeDescription [17] = `Hole 18 description...`;
    }

    getHoleDescription(hole: number): string {
        return this.holeDescription[hole];
    }
}
