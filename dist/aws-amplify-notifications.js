(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"), require("aws_amplify_cache"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_notifications", ["aws_amplify_core", "aws_amplify_cache"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_notifications"] = factory(require("aws_amplify_core"), require("aws_amplify_cache"));
	else
		root["aws_amplify_notifications"] = factory(root["aws_amplify_core"], root["aws_amplify_cache"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__, __WEBPACK_EXTERNAL_MODULE__aws_amplify_cache__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@aws-crypto/sha256-js/build/RawSha256.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/RawSha256.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawSha256 = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-js/build/constants.js");
/**
 * @internal
 */
var RawSha256 = /** @class */ (function () {
    function RawSha256() {
        this.state = Int32Array.from(constants_1.INIT);
        this.temp = new Int32Array(64);
        this.buffer = new Uint8Array(64);
        this.bufferLength = 0;
        this.bytesHashed = 0;
        /**
         * @internal
         */
        this.finished = false;
    }
    RawSha256.prototype.update = function (data) {
        if (this.finished) {
            throw new Error("Attempted to update an already finished hash.");
        }
        var position = 0;
        var byteLength = data.byteLength;
        this.bytesHashed += byteLength;
        if (this.bytesHashed * 8 > constants_1.MAX_HASHABLE_LENGTH) {
            throw new Error("Cannot hash more than 2^53 - 1 bits");
        }
        while (byteLength > 0) {
            this.buffer[this.bufferLength++] = data[position++];
            byteLength--;
            if (this.bufferLength === constants_1.BLOCK_SIZE) {
                this.hashBuffer();
                this.bufferLength = 0;
            }
        }
    };
    RawSha256.prototype.digest = function () {
        if (!this.finished) {
            var bitsHashed = this.bytesHashed * 8;
            var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
            var undecoratedLength = this.bufferLength;
            bufferView.setUint8(this.bufferLength++, 0x80);
            // Ensure the final block has enough room for the hashed length
            if (undecoratedLength % constants_1.BLOCK_SIZE >= constants_1.BLOCK_SIZE - 8) {
                for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE; i++) {
                    bufferView.setUint8(i, 0);
                }
                this.hashBuffer();
                this.bufferLength = 0;
            }
            for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE - 8; i++) {
                bufferView.setUint8(i, 0);
            }
            bufferView.setUint32(constants_1.BLOCK_SIZE - 8, Math.floor(bitsHashed / 0x100000000), true);
            bufferView.setUint32(constants_1.BLOCK_SIZE - 4, bitsHashed);
            this.hashBuffer();
            this.finished = true;
        }
        // The value in state is little-endian rather than big-endian, so flip
        // each word into a new Uint8Array
        var out = new Uint8Array(constants_1.DIGEST_LENGTH);
        for (var i = 0; i < 8; i++) {
            out[i * 4] = (this.state[i] >>> 24) & 0xff;
            out[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;
            out[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;
            out[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;
        }
        return out;
    };
    RawSha256.prototype.hashBuffer = function () {
        var _a = this, buffer = _a.buffer, state = _a.state;
        var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
        for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
            if (i < 16) {
                this.temp[i] =
                    ((buffer[i * 4] & 0xff) << 24) |
                        ((buffer[i * 4 + 1] & 0xff) << 16) |
                        ((buffer[i * 4 + 2] & 0xff) << 8) |
                        (buffer[i * 4 + 3] & 0xff);
            }
            else {
                var u = this.temp[i - 2];
                var t1_1 = ((u >>> 17) | (u << 15)) ^ ((u >>> 19) | (u << 13)) ^ (u >>> 10);
                u = this.temp[i - 15];
                var t2_1 = ((u >>> 7) | (u << 25)) ^ ((u >>> 18) | (u << 14)) ^ (u >>> 3);
                this.temp[i] =
                    ((t1_1 + this.temp[i - 7]) | 0) + ((t2_1 + this.temp[i - 16]) | 0);
            }
            var t1 = ((((((state4 >>> 6) | (state4 << 26)) ^
                ((state4 >>> 11) | (state4 << 21)) ^
                ((state4 >>> 25) | (state4 << 7))) +
                ((state4 & state5) ^ (~state4 & state6))) |
                0) +
                ((state7 + ((constants_1.KEY[i] + this.temp[i]) | 0)) | 0)) |
                0;
            var t2 = ((((state0 >>> 2) | (state0 << 30)) ^
                ((state0 >>> 13) | (state0 << 19)) ^
                ((state0 >>> 22) | (state0 << 10))) +
                ((state0 & state1) ^ (state0 & state2) ^ (state1 & state2))) |
                0;
            state7 = state6;
            state6 = state5;
            state5 = state4;
            state4 = (state3 + t1) | 0;
            state3 = state2;
            state2 = state1;
            state1 = state0;
            state0 = (t1 + t2) | 0;
        }
        state[0] += state0;
        state[1] += state1;
        state[2] += state2;
        state[3] += state3;
        state[4] += state4;
        state[5] += state5;
        state[6] += state6;
        state[7] += state7;
    };
    return RawSha256;
}());
exports.RawSha256 = RawSha256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF3U2hhMjU2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Jhd1NoYTI1Ni50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FNcUI7QUFFckI7O0dBRUc7QUFDSDtJQUFBO1FBQ1UsVUFBSyxHQUFlLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQUksQ0FBQyxDQUFDO1FBQzFDLFNBQUksR0FBZSxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxXQUFNLEdBQWUsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFaEM7O1dBRUc7UUFDSCxhQUFRLEdBQVksS0FBSyxDQUFDO0lBOEk1QixDQUFDO0lBNUlDLDBCQUFNLEdBQU4sVUFBTyxJQUFnQjtRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBQSxVQUFVLEdBQUssSUFBSSxXQUFULENBQVU7UUFDMUIsSUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRywrQkFBbUIsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxPQUFPLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNwRCxVQUFVLEVBQUUsQ0FBQztZQUViLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxzQkFBVSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQU0sVUFBVSxHQUFHLElBQUksUUFBUSxDQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUN2QixDQUFDO1lBRUYsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzVDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRS9DLCtEQUErRDtZQUMvRCxJQUFJLGlCQUFpQixHQUFHLHNCQUFVLElBQUksc0JBQVUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsc0JBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbkQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzNCO2dCQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLHNCQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMzQjtZQUNELFVBQVUsQ0FBQyxTQUFTLENBQ2xCLHNCQUFVLEdBQUcsQ0FBQyxFQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxFQUNwQyxJQUFJLENBQ0wsQ0FBQztZQUNGLFVBQVUsQ0FBQyxTQUFTLENBQUMsc0JBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBRUQsc0VBQXNFO1FBQ3RFLGtDQUFrQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyx5QkFBYSxDQUFDLENBQUM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDM0MsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDL0M7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTyw4QkFBVSxHQUFsQjtRQUNRLElBQUEsS0FBb0IsSUFBSSxFQUF0QixNQUFNLFlBQUEsRUFBRSxLQUFLLFdBQVMsQ0FBQztRQUUvQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ25CLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDakMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBTSxJQUFFLEdBQ04sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFbkUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QixJQUFNLElBQUUsR0FDTixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLENBQUMsSUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsSUFBTSxFQUFFLEdBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsZUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUM7WUFFSixJQUFNLEVBQUUsR0FDTixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQztZQUVKLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDaEIsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUNuQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUNuQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBeEpELElBd0pDO0FBeEpZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQkxPQ0tfU0laRSxcbiAgRElHRVNUX0xFTkdUSCxcbiAgSU5JVCxcbiAgS0VZLFxuICBNQVhfSEFTSEFCTEVfTEVOR1RIXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY2xhc3MgUmF3U2hhMjU2IHtcbiAgcHJpdmF0ZSBzdGF0ZTogSW50MzJBcnJheSA9IEludDMyQXJyYXkuZnJvbShJTklUKTtcbiAgcHJpdmF0ZSB0ZW1wOiBJbnQzMkFycmF5ID0gbmV3IEludDMyQXJyYXkoNjQpO1xuICBwcml2YXRlIGJ1ZmZlcjogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDY0KTtcbiAgcHJpdmF0ZSBidWZmZXJMZW5ndGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYnl0ZXNIYXNoZWQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZmluaXNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICB1cGRhdGUoZGF0YTogVWludDhBcnJheSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gdXBkYXRlIGFuIGFscmVhZHkgZmluaXNoZWQgaGFzaC5cIik7XG4gICAgfVxuXG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgeyBieXRlTGVuZ3RoIH0gPSBkYXRhO1xuICAgIHRoaXMuYnl0ZXNIYXNoZWQgKz0gYnl0ZUxlbmd0aDtcblxuICAgIGlmICh0aGlzLmJ5dGVzSGFzaGVkICogOCA+IE1BWF9IQVNIQUJMRV9MRU5HVEgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO1xuICAgIH1cblxuICAgIHdoaWxlIChieXRlTGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5idWZmZXJbdGhpcy5idWZmZXJMZW5ndGgrK10gPSBkYXRhW3Bvc2l0aW9uKytdO1xuICAgICAgYnl0ZUxlbmd0aC0tO1xuXG4gICAgICBpZiAodGhpcy5idWZmZXJMZW5ndGggPT09IEJMT0NLX1NJWkUpIHtcbiAgICAgICAgdGhpcy5oYXNoQnVmZmVyKCk7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaWdlc3QoKTogVWludDhBcnJheSB7XG4gICAgaWYgKCF0aGlzLmZpbmlzaGVkKSB7XG4gICAgICBjb25zdCBiaXRzSGFzaGVkID0gdGhpcy5ieXRlc0hhc2hlZCAqIDg7XG4gICAgICBjb25zdCBidWZmZXJWaWV3ID0gbmV3IERhdGFWaWV3KFxuICAgICAgICB0aGlzLmJ1ZmZlci5idWZmZXIsXG4gICAgICAgIHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQsXG4gICAgICAgIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHVuZGVjb3JhdGVkTGVuZ3RoID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICBidWZmZXJWaWV3LnNldFVpbnQ4KHRoaXMuYnVmZmVyTGVuZ3RoKyssIDB4ODApO1xuXG4gICAgICAvLyBFbnN1cmUgdGhlIGZpbmFsIGJsb2NrIGhhcyBlbm91Z2ggcm9vbSBmb3IgdGhlIGhhc2hlZCBsZW5ndGhcbiAgICAgIGlmICh1bmRlY29yYXRlZExlbmd0aCAlIEJMT0NLX1NJWkUgPj0gQkxPQ0tfU0laRSAtIDgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYnVmZmVyTGVuZ3RoOyBpIDwgQkxPQ0tfU0laRTsgaSsrKSB7XG4gICAgICAgICAgYnVmZmVyVmlldy5zZXRVaW50OChpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc2hCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSAwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5idWZmZXJMZW5ndGg7IGkgPCBCTE9DS19TSVpFIC0gODsgaSsrKSB7XG4gICAgICAgIGJ1ZmZlclZpZXcuc2V0VWludDgoaSwgMCk7XG4gICAgICB9XG4gICAgICBidWZmZXJWaWV3LnNldFVpbnQzMihcbiAgICAgICAgQkxPQ0tfU0laRSAtIDgsXG4gICAgICAgIE1hdGguZmxvb3IoYml0c0hhc2hlZCAvIDB4MTAwMDAwMDAwKSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGJ1ZmZlclZpZXcuc2V0VWludDMyKEJMT0NLX1NJWkUgLSA0LCBiaXRzSGFzaGVkKTtcblxuICAgICAgdGhpcy5oYXNoQnVmZmVyKCk7XG5cbiAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRoZSB2YWx1ZSBpbiBzdGF0ZSBpcyBsaXR0bGUtZW5kaWFuIHJhdGhlciB0aGFuIGJpZy1lbmRpYW4sIHNvIGZsaXBcbiAgICAvLyBlYWNoIHdvcmQgaW50byBhIG5ldyBVaW50OEFycmF5XG4gICAgY29uc3Qgb3V0ID0gbmV3IFVpbnQ4QXJyYXkoRElHRVNUX0xFTkdUSCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIG91dFtpICogNF0gPSAodGhpcy5zdGF0ZVtpXSA+Pj4gMjQpICYgMHhmZjtcbiAgICAgIG91dFtpICogNCArIDFdID0gKHRoaXMuc3RhdGVbaV0gPj4+IDE2KSAmIDB4ZmY7XG4gICAgICBvdXRbaSAqIDQgKyAyXSA9ICh0aGlzLnN0YXRlW2ldID4+PiA4KSAmIDB4ZmY7XG4gICAgICBvdXRbaSAqIDQgKyAzXSA9ICh0aGlzLnN0YXRlW2ldID4+PiAwKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzaEJ1ZmZlcigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGJ1ZmZlciwgc3RhdGUgfSA9IHRoaXM7XG5cbiAgICBsZXQgc3RhdGUwID0gc3RhdGVbMF0sXG4gICAgICBzdGF0ZTEgPSBzdGF0ZVsxXSxcbiAgICAgIHN0YXRlMiA9IHN0YXRlWzJdLFxuICAgICAgc3RhdGUzID0gc3RhdGVbM10sXG4gICAgICBzdGF0ZTQgPSBzdGF0ZVs0XSxcbiAgICAgIHN0YXRlNSA9IHN0YXRlWzVdLFxuICAgICAgc3RhdGU2ID0gc3RhdGVbNl0sXG4gICAgICBzdGF0ZTcgPSBzdGF0ZVs3XTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQkxPQ0tfU0laRTsgaSsrKSB7XG4gICAgICBpZiAoaSA8IDE2KSB7XG4gICAgICAgIHRoaXMudGVtcFtpXSA9XG4gICAgICAgICAgKChidWZmZXJbaSAqIDRdICYgMHhmZikgPDwgMjQpIHxcbiAgICAgICAgICAoKGJ1ZmZlcltpICogNCArIDFdICYgMHhmZikgPDwgMTYpIHxcbiAgICAgICAgICAoKGJ1ZmZlcltpICogNCArIDJdICYgMHhmZikgPDwgOCkgfFxuICAgICAgICAgIChidWZmZXJbaSAqIDQgKyAzXSAmIDB4ZmYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHUgPSB0aGlzLnRlbXBbaSAtIDJdO1xuICAgICAgICBjb25zdCB0MSA9XG4gICAgICAgICAgKCh1ID4+PiAxNykgfCAodSA8PCAxNSkpIF4gKCh1ID4+PiAxOSkgfCAodSA8PCAxMykpIF4gKHUgPj4+IDEwKTtcblxuICAgICAgICB1ID0gdGhpcy50ZW1wW2kgLSAxNV07XG4gICAgICAgIGNvbnN0IHQyID1cbiAgICAgICAgICAoKHUgPj4+IDcpIHwgKHUgPDwgMjUpKSBeICgodSA+Pj4gMTgpIHwgKHUgPDwgMTQpKSBeICh1ID4+PiAzKTtcblxuICAgICAgICB0aGlzLnRlbXBbaV0gPVxuICAgICAgICAgICgodDEgKyB0aGlzLnRlbXBbaSAtIDddKSB8IDApICsgKCh0MiArIHRoaXMudGVtcFtpIC0gMTZdKSB8IDApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0MSA9XG4gICAgICAgICgoKCgoKHN0YXRlNCA+Pj4gNikgfCAoc3RhdGU0IDw8IDI2KSkgXlxuICAgICAgICAgICgoc3RhdGU0ID4+PiAxMSkgfCAoc3RhdGU0IDw8IDIxKSkgXlxuICAgICAgICAgICgoc3RhdGU0ID4+PiAyNSkgfCAoc3RhdGU0IDw8IDcpKSkgK1xuICAgICAgICAgICgoc3RhdGU0ICYgc3RhdGU1KSBeICh+c3RhdGU0ICYgc3RhdGU2KSkpIHxcbiAgICAgICAgICAwKSArXG4gICAgICAgICAgKChzdGF0ZTcgKyAoKEtFWVtpXSArIHRoaXMudGVtcFtpXSkgfCAwKSkgfCAwKSkgfFxuICAgICAgICAwO1xuXG4gICAgICBjb25zdCB0MiA9XG4gICAgICAgICgoKChzdGF0ZTAgPj4+IDIpIHwgKHN0YXRlMCA8PCAzMCkpIF5cbiAgICAgICAgICAoKHN0YXRlMCA+Pj4gMTMpIHwgKHN0YXRlMCA8PCAxOSkpIF5cbiAgICAgICAgICAoKHN0YXRlMCA+Pj4gMjIpIHwgKHN0YXRlMCA8PCAxMCkpKSArXG4gICAgICAgICAgKChzdGF0ZTAgJiBzdGF0ZTEpIF4gKHN0YXRlMCAmIHN0YXRlMikgXiAoc3RhdGUxICYgc3RhdGUyKSkpIHxcbiAgICAgICAgMDtcblxuICAgICAgc3RhdGU3ID0gc3RhdGU2O1xuICAgICAgc3RhdGU2ID0gc3RhdGU1O1xuICAgICAgc3RhdGU1ID0gc3RhdGU0O1xuICAgICAgc3RhdGU0ID0gKHN0YXRlMyArIHQxKSB8IDA7XG4gICAgICBzdGF0ZTMgPSBzdGF0ZTI7XG4gICAgICBzdGF0ZTIgPSBzdGF0ZTE7XG4gICAgICBzdGF0ZTEgPSBzdGF0ZTA7XG4gICAgICBzdGF0ZTAgPSAodDEgKyB0MikgfCAwO1xuICAgIH1cblxuICAgIHN0YXRlWzBdICs9IHN0YXRlMDtcbiAgICBzdGF0ZVsxXSArPSBzdGF0ZTE7XG4gICAgc3RhdGVbMl0gKz0gc3RhdGUyO1xuICAgIHN0YXRlWzNdICs9IHN0YXRlMztcbiAgICBzdGF0ZVs0XSArPSBzdGF0ZTQ7XG4gICAgc3RhdGVbNV0gKz0gc3RhdGU1O1xuICAgIHN0YXRlWzZdICs9IHN0YXRlNjtcbiAgICBzdGF0ZVs3XSArPSBzdGF0ZTc7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/constants.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/constants.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_HASHABLE_LENGTH = exports.INIT = exports.KEY = exports.DIGEST_LENGTH = exports.BLOCK_SIZE = void 0;
/**
 * @internal
 */
exports.BLOCK_SIZE = 64;
/**
 * @internal
 */
exports.DIGEST_LENGTH = 32;
/**
 * @internal
 */
exports.KEY = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/**
 * @internal
 */
exports.INIT = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
];
/**
 * @internal
 */
exports.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNVLFFBQUEsVUFBVSxHQUFXLEVBQUUsQ0FBQztBQUVyQzs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFXLEVBQUUsQ0FBQztBQUV4Qzs7R0FFRztBQUNVLFFBQUEsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDO0lBQ2pDLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7Q0FDWCxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHO0lBQ2xCLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0NBQ1gsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxTQUFBLENBQUMsRUFBSSxFQUFFLENBQUEsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQkxPQ0tfU0laRTogbnVtYmVyID0gNjQ7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBESUdFU1RfTEVOR1RIOiBudW1iZXIgPSAzMjtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEtFWSA9IG5ldyBVaW50MzJBcnJheShbXG4gIDB4NDI4YTJmOTgsXG4gIDB4NzEzNzQ0OTEsXG4gIDB4YjVjMGZiY2YsXG4gIDB4ZTliNWRiYTUsXG4gIDB4Mzk1NmMyNWIsXG4gIDB4NTlmMTExZjEsXG4gIDB4OTIzZjgyYTQsXG4gIDB4YWIxYzVlZDUsXG4gIDB4ZDgwN2FhOTgsXG4gIDB4MTI4MzViMDEsXG4gIDB4MjQzMTg1YmUsXG4gIDB4NTUwYzdkYzMsXG4gIDB4NzJiZTVkNzQsXG4gIDB4ODBkZWIxZmUsXG4gIDB4OWJkYzA2YTcsXG4gIDB4YzE5YmYxNzQsXG4gIDB4ZTQ5YjY5YzEsXG4gIDB4ZWZiZTQ3ODYsXG4gIDB4MGZjMTlkYzYsXG4gIDB4MjQwY2ExY2MsXG4gIDB4MmRlOTJjNmYsXG4gIDB4NGE3NDg0YWEsXG4gIDB4NWNiMGE5ZGMsXG4gIDB4NzZmOTg4ZGEsXG4gIDB4OTgzZTUxNTIsXG4gIDB4YTgzMWM2NmQsXG4gIDB4YjAwMzI3YzgsXG4gIDB4YmY1OTdmYzcsXG4gIDB4YzZlMDBiZjMsXG4gIDB4ZDVhNzkxNDcsXG4gIDB4MDZjYTYzNTEsXG4gIDB4MTQyOTI5NjcsXG4gIDB4MjdiNzBhODUsXG4gIDB4MmUxYjIxMzgsXG4gIDB4NGQyYzZkZmMsXG4gIDB4NTMzODBkMTMsXG4gIDB4NjUwYTczNTQsXG4gIDB4NzY2YTBhYmIsXG4gIDB4ODFjMmM5MmUsXG4gIDB4OTI3MjJjODUsXG4gIDB4YTJiZmU4YTEsXG4gIDB4YTgxYTY2NGIsXG4gIDB4YzI0YjhiNzAsXG4gIDB4Yzc2YzUxYTMsXG4gIDB4ZDE5MmU4MTksXG4gIDB4ZDY5OTA2MjQsXG4gIDB4ZjQwZTM1ODUsXG4gIDB4MTA2YWEwNzAsXG4gIDB4MTlhNGMxMTYsXG4gIDB4MWUzNzZjMDgsXG4gIDB4Mjc0ODc3NGMsXG4gIDB4MzRiMGJjYjUsXG4gIDB4MzkxYzBjYjMsXG4gIDB4NGVkOGFhNGEsXG4gIDB4NWI5Y2NhNGYsXG4gIDB4NjgyZTZmZjMsXG4gIDB4NzQ4ZjgyZWUsXG4gIDB4NzhhNTYzNmYsXG4gIDB4ODRjODc4MTQsXG4gIDB4OGNjNzAyMDgsXG4gIDB4OTBiZWZmZmEsXG4gIDB4YTQ1MDZjZWIsXG4gIDB4YmVmOWEzZjcsXG4gIDB4YzY3MTc4ZjJcbl0pO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgSU5JVCA9IFtcbiAgMHg2YTA5ZTY2NyxcbiAgMHhiYjY3YWU4NSxcbiAgMHgzYzZlZjM3MixcbiAgMHhhNTRmZjUzYSxcbiAgMHg1MTBlNTI3ZixcbiAgMHg5YjA1Njg4YyxcbiAgMHgxZjgzZDlhYixcbiAgMHg1YmUwY2QxOVxuXTtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9IQVNIQUJMRV9MRU5HVEggPSAyICoqIDUzIC0gMTtcbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/index.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
(0, tslib_1.__exportStar)(__webpack_require__(/*! ./jsSha256 */ "../../node_modules/@aws-crypto/sha256-js/build/jsSha256.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vanNTaGEyNTZcIjtcbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/jsSha256.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/jsSha256.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sha256 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-js/build/constants.js");
var RawSha256_1 = __webpack_require__(/*! ./RawSha256 */ "../../node_modules/@aws-crypto/sha256-js/build/RawSha256.js");
var util_1 = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/index.js");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.hash = new RawSha256_1.RawSha256();
        if (secret) {
            this.outer = new RawSha256_1.RawSha256();
            var inner = bufferFromSecret(secret);
            var outer = new Uint8Array(constants_1.BLOCK_SIZE);
            outer.set(inner);
            for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
                inner[i] ^= 0x36;
                outer[i] ^= 0x5c;
            }
            this.hash.update(inner);
            this.outer.update(outer);
            // overwrite the copied key in memory
            for (var i = 0; i < inner.byteLength; i++) {
                inner[i] = 0;
            }
        }
    }
    Sha256.prototype.update = function (toHash) {
        if ((0, util_1.isEmptyData)(toHash) || this.error) {
            return;
        }
        try {
            this.hash.update((0, util_1.convertToBuffer)(toHash));
        }
        catch (e) {
            this.error = e;
        }
    };
    /* This synchronous method keeps compatibility
     * with the v2 aws-sdk.
     */
    Sha256.prototype.digestSync = function () {
        if (this.error) {
            throw this.error;
        }
        if (this.outer) {
            if (!this.outer.finished) {
                this.outer.update(this.hash.digest());
            }
            return this.outer.digest();
        }
        return this.hash.digest();
    };
    /* The underlying digest method here is synchronous.
     * To keep the same interface with the other hash functions
     * the default is to expose this as an async method.
     * However, it can sometimes be useful to have a sync method.
     */
    Sha256.prototype.digest = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, this.digestSync()];
            });
        });
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function bufferFromSecret(secret) {
    var input = (0, util_1.convertToBuffer)(secret);
    if (input.byteLength > constants_1.BLOCK_SIZE) {
        var bufferHash = new RawSha256_1.RawSha256();
        bufferHash.update(input);
        input = bufferHash.digest();
    }
    var buffer = new Uint8Array(constants_1.BLOCK_SIZE);
    buffer.set(input);
    return buffer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNTaGEyNTYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvanNTaGEyNTYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHlDQUF5QztBQUN6Qyx5Q0FBd0M7QUFFeEMseUNBQWdFO0FBRWhFO0lBS0UsZ0JBQVksTUFBbUI7UUFKZCxTQUFJLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFLdEMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1lBQzdCLElBQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLHNCQUFVLENBQUMsQ0FBQztZQUN6QyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxzQkFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFekIscUNBQXFDO1lBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQU8sTUFBa0I7UUFDdkIsSUFBSSxJQUFBLGtCQUFXLEVBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBQSxzQkFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkJBQVUsR0FBVjtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNsQjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0csdUJBQU0sR0FBWjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQzs7O0tBQzFCO0lBQ0gsYUFBQztBQUFELENBQUMsQUFsRUQsSUFrRUM7QUFsRVksd0JBQU07QUFvRW5CLFNBQVMsZ0JBQWdCLENBQUMsTUFBa0I7SUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBQSxzQkFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLElBQUksS0FBSyxDQUFDLFVBQVUsR0FBRyxzQkFBVSxFQUFFO1FBQ2pDLElBQU0sVUFBVSxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM3QjtJQUVELElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLHNCQUFVLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCTE9DS19TSVpFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBSYXdTaGEyNTYgfSBmcm9tIFwiLi9SYXdTaGEyNTZcIjtcbmltcG9ydCB7IEhhc2gsIFNvdXJjZURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHlEYXRhLCBjb252ZXJ0VG9CdWZmZXIgfSBmcm9tIFwiQGF3cy1jcnlwdG8vdXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgU2hhMjU2IGltcGxlbWVudHMgSGFzaCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaGFzaCA9IG5ldyBSYXdTaGEyNTYoKTtcbiAgcHJpdmF0ZSByZWFkb25seSBvdXRlcj86IFJhd1NoYTI1NjtcbiAgcHJpdmF0ZSBlcnJvcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHNlY3JldD86IFNvdXJjZURhdGEpIHtcbiAgICBpZiAoc2VjcmV0KSB7XG4gICAgICB0aGlzLm91dGVyID0gbmV3IFJhd1NoYTI1NigpO1xuICAgICAgY29uc3QgaW5uZXIgPSBidWZmZXJGcm9tU2VjcmV0KHNlY3JldCk7XG4gICAgICBjb25zdCBvdXRlciA9IG5ldyBVaW50OEFycmF5KEJMT0NLX1NJWkUpO1xuICAgICAgb3V0ZXIuc2V0KGlubmVyKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCTE9DS19TSVpFOyBpKyspIHtcbiAgICAgICAgaW5uZXJbaV0gXj0gMHgzNjtcbiAgICAgICAgb3V0ZXJbaV0gXj0gMHg1YztcbiAgICAgIH1cblxuICAgICAgdGhpcy5oYXNoLnVwZGF0ZShpbm5lcik7XG4gICAgICB0aGlzLm91dGVyLnVwZGF0ZShvdXRlcik7XG5cbiAgICAgIC8vIG92ZXJ3cml0ZSB0aGUgY29waWVkIGtleSBpbiBtZW1vcnlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5uZXIuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlubmVyW2ldID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGUodG9IYXNoOiBTb3VyY2VEYXRhKTogdm9pZCB7XG4gICAgaWYgKGlzRW1wdHlEYXRhKHRvSGFzaCkgfHwgdGhpcy5lcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmhhc2gudXBkYXRlKGNvbnZlcnRUb0J1ZmZlcih0b0hhc2gpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVycm9yID0gZTtcbiAgICB9XG4gIH1cblxuICAvKiBUaGlzIHN5bmNocm9ub3VzIG1ldGhvZCBrZWVwcyBjb21wYXRpYmlsaXR5XG4gICAqIHdpdGggdGhlIHYyIGF3cy1zZGsuXG4gICAqL1xuICBkaWdlc3RTeW5jKCk6IFVpbnQ4QXJyYXkge1xuICAgIGlmICh0aGlzLmVycm9yKSB7XG4gICAgICB0aHJvdyB0aGlzLmVycm9yO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm91dGVyKSB7XG4gICAgICBpZiAoIXRoaXMub3V0ZXIuZmluaXNoZWQpIHtcbiAgICAgICAgdGhpcy5vdXRlci51cGRhdGUodGhpcy5oYXNoLmRpZ2VzdCgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMub3V0ZXIuZGlnZXN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFzaC5kaWdlc3QoKTtcbiAgfVxuXG4gIC8qIFRoZSB1bmRlcmx5aW5nIGRpZ2VzdCBtZXRob2QgaGVyZSBpcyBzeW5jaHJvbm91cy5cbiAgICogVG8ga2VlcCB0aGUgc2FtZSBpbnRlcmZhY2Ugd2l0aCB0aGUgb3RoZXIgaGFzaCBmdW5jdGlvbnNcbiAgICogdGhlIGRlZmF1bHQgaXMgdG8gZXhwb3NlIHRoaXMgYXMgYW4gYXN5bmMgbWV0aG9kLlxuICAgKiBIb3dldmVyLCBpdCBjYW4gc29tZXRpbWVzIGJlIHVzZWZ1bCB0byBoYXZlIGEgc3luYyBtZXRob2QuXG4gICAqL1xuICBhc3luYyBkaWdlc3QoKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gICAgcmV0dXJuIHRoaXMuZGlnZXN0U3luYygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1ZmZlckZyb21TZWNyZXQoc2VjcmV0OiBTb3VyY2VEYXRhKTogVWludDhBcnJheSB7XG4gIGxldCBpbnB1dCA9IGNvbnZlcnRUb0J1ZmZlcihzZWNyZXQpO1xuXG4gIGlmIChpbnB1dC5ieXRlTGVuZ3RoID4gQkxPQ0tfU0laRSkge1xuICAgIGNvbnN0IGJ1ZmZlckhhc2ggPSBuZXcgUmF3U2hhMjU2KCk7XG4gICAgYnVmZmVySGFzaC51cGRhdGUoaW5wdXQpO1xuICAgIGlucHV0ID0gYnVmZmVySGFzaC5kaWdlc3QoKTtcbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KEJMT0NLX1NJWkUpO1xuICBidWZmZXIuc2V0KGlucHV0KTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/convertToBuffer.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/convertToBuffer.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToBuffer = void 0;
var util_utf8_browser_1 = __webpack_require__(/*! @aws-sdk/util-utf8-browser */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js");
// Quick polyfill
var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from
    ? function (input) { return Buffer.from(input, "utf8"); }
    : util_utf8_browser_1.fromUtf8;
function convertToBuffer(data) {
    // Already a Uint8, do nothing
    if (data instanceof Uint8Array)
        return data;
    if (typeof data === "string") {
        return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
exports.convertToBuffer = convertToBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydFRvQnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnZlcnRUb0J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLHNDQUFzQzs7O0FBR3RDLGdFQUF5RTtBQUV6RSxpQkFBaUI7QUFDakIsSUFBTSxRQUFRLEdBQ1osT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJO0lBQzFDLENBQUMsQ0FBQyxVQUFDLEtBQWEsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUExQixDQUEwQjtJQUMvQyxDQUFDLENBQUMsNEJBQWUsQ0FBQztBQUV0QixTQUFnQixlQUFlLENBQUMsSUFBZ0I7SUFDOUMsOEJBQThCO0lBQzlCLElBQUksSUFBSSxZQUFZLFVBQVU7UUFBRSxPQUFPLElBQUksQ0FBQztJQUU1QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUVELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QixPQUFPLElBQUksVUFBVSxDQUNuQixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQy9DLENBQUM7S0FDSDtJQUVELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWpCRCwwQ0FpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgQW1hem9uLmNvbSBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcblxuaW1wb3J0IHsgU291cmNlRGF0YSB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgZnJvbVV0ZjggYXMgZnJvbVV0ZjhCcm93c2VyIH0gZnJvbSBcIkBhd3Mtc2RrL3V0aWwtdXRmOC1icm93c2VyXCI7XG5cbi8vIFF1aWNrIHBvbHlmaWxsXG5jb25zdCBmcm9tVXRmOCA9XG4gIHR5cGVvZiBCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgQnVmZmVyLmZyb21cbiAgICA/IChpbnB1dDogc3RyaW5nKSA9PiBCdWZmZXIuZnJvbShpbnB1dCwgXCJ1dGY4XCIpXG4gICAgOiBmcm9tVXRmOEJyb3dzZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9CdWZmZXIoZGF0YTogU291cmNlRGF0YSk6IFVpbnQ4QXJyYXkge1xuICAvLyBBbHJlYWR5IGEgVWludDgsIGRvIG5vdGhpbmdcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSByZXR1cm4gZGF0YTtcblxuICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZnJvbVV0ZjgoZGF0YSk7XG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFxuICAgICAgZGF0YS5idWZmZXIsXG4gICAgICBkYXRhLmJ5dGVPZmZzZXQsXG4gICAgICBkYXRhLmJ5dGVMZW5ndGggLyBVaW50OEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheShkYXRhKTtcbn1cbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/index.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uint32ArrayFrom = exports.numToUint8 = exports.isEmptyData = exports.convertToBuffer = void 0;
var convertToBuffer_1 = __webpack_require__(/*! ./convertToBuffer */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/convertToBuffer.js");
Object.defineProperty(exports, "convertToBuffer", ({ enumerable: true, get: function () { return convertToBuffer_1.convertToBuffer; } }));
var isEmptyData_1 = __webpack_require__(/*! ./isEmptyData */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/isEmptyData.js");
Object.defineProperty(exports, "isEmptyData", ({ enumerable: true, get: function () { return isEmptyData_1.isEmptyData; } }));
var numToUint8_1 = __webpack_require__(/*! ./numToUint8 */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/numToUint8.js");
Object.defineProperty(exports, "numToUint8", ({ enumerable: true, get: function () { return numToUint8_1.numToUint8; } }));
var uint32ArrayFrom_1 = __webpack_require__(/*! ./uint32ArrayFrom */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js");
Object.defineProperty(exports, "uint32ArrayFrom", ({ enumerable: true, get: function () { return uint32ArrayFrom_1.uint32ArrayFrom; } }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSxzQ0FBc0M7OztBQUV0QyxxREFBb0Q7QUFBM0Msa0hBQUEsZUFBZSxPQUFBO0FBQ3hCLDZDQUE0QztBQUFuQywwR0FBQSxXQUFXLE9BQUE7QUFDcEIsMkNBQTBDO0FBQWpDLHdHQUFBLFVBQVUsT0FBQTtBQUNuQixxREFBa0Q7QUFBMUMsa0hBQUEsZUFBZSxPQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEFtYXpvbi5jb20gSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG5cbmV4cG9ydCB7IGNvbnZlcnRUb0J1ZmZlciB9IGZyb20gXCIuL2NvbnZlcnRUb0J1ZmZlclwiO1xuZXhwb3J0IHsgaXNFbXB0eURhdGEgfSBmcm9tIFwiLi9pc0VtcHR5RGF0YVwiO1xuZXhwb3J0IHsgbnVtVG9VaW50OCB9IGZyb20gXCIuL251bVRvVWludDhcIjtcbmV4cG9ydCB7dWludDMyQXJyYXlGcm9tfSBmcm9tICcuL3VpbnQzMkFycmF5RnJvbSc7XG4iXX0=

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/isEmptyData.js":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/isEmptyData.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEmptyData = void 0;
function isEmptyData(data) {
    if (typeof data === "string") {
        return data.length === 0;
    }
    return data.byteLength === 0;
}
exports.isEmptyData = isEmptyData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaXNFbXB0eURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSxzQ0FBc0M7OztBQUl0QyxTQUFnQixXQUFXLENBQUMsSUFBZ0I7SUFDMUMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztLQUMxQjtJQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQU5ELGtDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEFtYXpvbi5jb20gSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG5cbmltcG9ydCB7IFNvdXJjZURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlEYXRhKGRhdGE6IFNvdXJjZURhdGEpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGRhdGEubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIGRhdGEuYnl0ZUxlbmd0aCA9PT0gMDtcbn1cbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/numToUint8.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/numToUint8.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numToUint8 = void 0;
function numToUint8(num) {
    return new Uint8Array([
        (num & 0xff000000) >> 24,
        (num & 0x00ff0000) >> 16,
        (num & 0x0000ff00) >> 8,
        num & 0x000000ff,
    ]);
}
exports.numToUint8 = numToUint8;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtVG9VaW50OC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9udW1Ub1VpbnQ4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsc0NBQXNDOzs7QUFFdEMsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7SUFDcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQztRQUNwQixDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQ3hCLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDeEIsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN2QixHQUFHLEdBQUcsVUFBVTtLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBUEQsZ0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgQW1hem9uLmNvbSBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcblxuZXhwb3J0IGZ1bmN0aW9uIG51bVRvVWludDgobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAobnVtICYgMHhmZjAwMDAwMCkgPj4gMjQsXG4gICAgKG51bSAmIDB4MDBmZjAwMDApID4+IDE2LFxuICAgIChudW0gJiAweDAwMDBmZjAwKSA+PiA4LFxuICAgIG51bSAmIDB4MDAwMDAwZmYsXG4gIF0pO1xufVxuIl19

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uint32ArrayFrom = void 0;
// IE 11 does not support Array.from, so we do it manually
function uint32ArrayFrom(a_lookUpTable) {
    if (!Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
            return_array[a_index] = a_lookUpTable[a_index];
        }
        return return_array;
    }
    return Uint32Array.from(a_lookUpTable);
}
exports.uint32ArrayFrom = uint32ArrayFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWludDMyQXJyYXlGcm9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VpbnQzMkFycmF5RnJvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLHNDQUFzQzs7O0FBRXRDLDBEQUEwRDtBQUMxRCxTQUFnQixlQUFlLENBQUMsYUFBNEI7SUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZixJQUFNLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsT0FBTyxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQy9DO1FBQ0QsT0FBTyxZQUFZLENBQUE7S0FDcEI7SUFDRCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDeEMsQ0FBQztBQVZELDBDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEFtYXpvbi5jb20gSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG5cbi8vIElFIDExIGRvZXMgbm90IHN1cHBvcnQgQXJyYXkuZnJvbSwgc28gd2UgZG8gaXQgbWFudWFsbHlcbmV4cG9ydCBmdW5jdGlvbiB1aW50MzJBcnJheUZyb20oYV9sb29rVXBUYWJsZTogQXJyYXk8bnVtYmVyPik6IFVpbnQzMkFycmF5IHtcbiAgaWYgKCFBcnJheS5mcm9tKSB7XG4gICAgY29uc3QgcmV0dXJuX2FycmF5ID0gbmV3IFVpbnQzMkFycmF5KGFfbG9va1VwVGFibGUubGVuZ3RoKVxuICAgIGxldCBhX2luZGV4ID0gMFxuICAgIHdoaWxlIChhX2luZGV4IDwgYV9sb29rVXBUYWJsZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybl9hcnJheVthX2luZGV4XSA9IGFfbG9va1VwVGFibGVbYV9pbmRleF1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVybl9hcnJheVxuICB9XG4gIHJldHVybiBVaW50MzJBcnJheS5mcm9tKGFfbG9va1VwVGFibGUpXG59XG4iXX0=

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js":
/*!*********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
/* harmony import */ var _pureJs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pureJs */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js");
/* harmony import */ var _whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./whatwgEncodingApi */ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js");


const fromUtf8 = (input) => typeof TextEncoder === "function" ? (0,_whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__.fromUtf8)(input) : (0,_pureJs__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(input);
const toUtf8 = (input) => typeof TextDecoder === "function" ? (0,_whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__.toUtf8)(input) : (0,_pureJs__WEBPACK_IMPORTED_MODULE_0__.toUtf8)(input);


/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
const fromUtf8 = (input) => {
    const bytes = [];
    for (let i = 0, len = input.length; i < len; i++) {
        const value = input.charCodeAt(i);
        if (value < 0x80) {
            bytes.push(value);
        }
        else if (value < 0x800) {
            bytes.push((value >> 6) | 0b11000000, (value & 0b111111) | 0b10000000);
        }
        else if (i + 1 < input.length && (value & 0xfc00) === 0xd800 && (input.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            const surrogatePair = 0x10000 + ((value & 0b1111111111) << 10) + (input.charCodeAt(++i) & 0b1111111111);
            bytes.push((surrogatePair >> 18) | 0b11110000, ((surrogatePair >> 12) & 0b111111) | 0b10000000, ((surrogatePair >> 6) & 0b111111) | 0b10000000, (surrogatePair & 0b111111) | 0b10000000);
        }
        else {
            bytes.push((value >> 12) | 0b11100000, ((value >> 6) & 0b111111) | 0b10000000, (value & 0b111111) | 0b10000000);
        }
    }
    return Uint8Array.from(bytes);
};
const toUtf8 = (input) => {
    let decoded = "";
    for (let i = 0, len = input.length; i < len; i++) {
        const byte = input[i];
        if (byte < 0x80) {
            decoded += String.fromCharCode(byte);
        }
        else if (0b11000000 <= byte && byte < 0b11100000) {
            const nextByte = input[++i];
            decoded += String.fromCharCode(((byte & 0b11111) << 6) | (nextByte & 0b111111));
        }
        else if (0b11110000 <= byte && byte < 0b101101101) {
            const surrogatePair = [byte, input[++i], input[++i], input[++i]];
            const encoded = "%" + surrogatePair.map((byteValue) => byteValue.toString(16)).join("%");
            decoded += decodeURIComponent(encoded);
        }
        else {
            decoded += String.fromCharCode(((byte & 0b1111) << 12) | ((input[++i] & 0b111111) << 6) | (input[++i] & 0b111111));
        }
    }
    return decoded;
};


/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js":
/*!*********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
function fromUtf8(input) {
    return new TextEncoder().encode(input);
}
function toUtf8(input) {
    return new TextDecoder("utf-8").decode(input);
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-hex-encoding/dist/es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-hex-encoding/dist/es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromHex: () => (/* binding */ fromHex),
/* harmony export */   toHex: () => (/* binding */ toHex)
/* harmony export */ });
var SHORT_TO_HEX = {};
var HEX_TO_SHORT = {};
for (var i = 0; i < 256; i++) {
    var encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = "0" + encodedByte;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
/**
 * Converts a hexadecimal encoded string to a Uint8Array of bytes.
 *
 * @param encoded The hexadecimal encoded string
 */
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    var out = new Uint8Array(encoded.length / 2);
    for (var i = 0; i < encoded.length; i += 2) {
        var encodedByte = encoded.substr(i, 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        }
        else {
            throw new Error("Cannot decode unrecognized sequence " + encodedByte + " as hexadecimal");
        }
    }
    return out;
}
/**
 * Converts a Uint8Array of binary data to a hexadecimal encoded string.
 *
 * @param bytes The binary data to encode
 */
function toHex(bytes) {
    var out = "";
    for (var i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxZQUFZLEdBQThCLEVBQUUsQ0FBQztBQUNuRCxJQUFNLFlBQVksR0FBOEIsRUFBRSxDQUFDO0FBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzVCLFdBQVcsR0FBRyxNQUFJLFdBQWEsQ0FBQztLQUNqQztJQUVELFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDOUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMvQjtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLE9BQWU7SUFDckMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0tBQ3hFO0lBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZELElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtZQUMvQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBdUMsV0FBVyxvQkFBaUIsQ0FBQyxDQUFDO1NBQ3RGO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLEtBQUssQ0FBQyxLQUFpQjtJQUNyQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU0hPUlRfVE9fSEVYOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge307XG5jb25zdCBIRVhfVE9fU0hPUlQ6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBsZXQgZW5jb2RlZEJ5dGUgPSBpLnRvU3RyaW5nKDE2KS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoZW5jb2RlZEJ5dGUubGVuZ3RoID09PSAxKSB7XG4gICAgZW5jb2RlZEJ5dGUgPSBgMCR7ZW5jb2RlZEJ5dGV9YDtcbiAgfVxuXG4gIFNIT1JUX1RPX0hFWFtpXSA9IGVuY29kZWRCeXRlO1xuICBIRVhfVE9fU0hPUlRbZW5jb2RlZEJ5dGVdID0gaTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGhleGFkZWNpbWFsIGVuY29kZWQgc3RyaW5nIHRvIGEgVWludDhBcnJheSBvZiBieXRlcy5cbiAqXG4gKiBAcGFyYW0gZW5jb2RlZCBUaGUgaGV4YWRlY2ltYWwgZW5jb2RlZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21IZXgoZW5jb2RlZDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gIGlmIChlbmNvZGVkLmxlbmd0aCAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZXggZW5jb2RlZCBzdHJpbmdzIG11c3QgaGF2ZSBhbiBldmVuIG51bWJlciBsZW5ndGhcIik7XG4gIH1cblxuICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheShlbmNvZGVkLmxlbmd0aCAvIDIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCBlbmNvZGVkQnl0ZSA9IGVuY29kZWQuc3Vic3RyKGksIDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGVuY29kZWRCeXRlIGluIEhFWF9UT19TSE9SVCkge1xuICAgICAgb3V0W2kgLyAyXSA9IEhFWF9UT19TSE9SVFtlbmNvZGVkQnl0ZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlY29kZSB1bnJlY29nbml6ZWQgc2VxdWVuY2UgJHtlbmNvZGVkQnl0ZX0gYXMgaGV4YWRlY2ltYWxgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgVWludDhBcnJheSBvZiBiaW5hcnkgZGF0YSB0byBhIGhleGFkZWNpbWFsIGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBieXRlcyBUaGUgYmluYXJ5IGRhdGEgdG8gZW5jb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0hleChieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmJ5dGVMZW5ndGg7IGkrKykge1xuICAgIG91dCArPSBTSE9SVF9UT19IRVhbYnl0ZXNbaV1dO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbiJdfQ==

/***/ }),

/***/ "../core/lib-esm/AwsClients/Pinpoint/base.js":
/*!***************************************************!*\
  !*** ../core/lib-esm/AwsClients/Pinpoint/base.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSharedHeaders=exports.defaultConfig=void 0;var _endpoints=__webpack_require__(/*! ../../clients/endpoints */ "../core/lib-esm/clients/endpoints/index.js");var _retry=__webpack_require__(/*! ../../clients/middleware/retry */ "../core/lib-esm/clients/middleware/retry/index.js");var _json=__webpack_require__(/*! ../../clients/serde/json */ "../core/lib-esm/clients/serde/json.js");var _Platform=__webpack_require__(/*! ../../Platform */ "../core/lib-esm/Platform/index.js");var SERVICE_NAME='mobiletargeting';var endpointResolver=function endpointResolver(_a){var region=_a.region;return{url:new URL("https://pinpoint.".concat(region,".").concat((0,_endpoints.getDnsSuffix)(region)))};};var defaultConfig={service:SERVICE_NAME,endpointResolver:endpointResolver,retryDecider:(0,_retry.getRetryDecider)(_json.parseJsonError),computeDelay:_retry.jitteredBackoff,userAgentValue:(0,_Platform.getAmplifyUserAgent)()};exports.defaultConfig=defaultConfig;var getSharedHeaders=function getSharedHeaders(){return{'content-type':'application/json'};};exports.getSharedHeaders=getSharedHeaders;

/***/ }),

/***/ "../core/lib-esm/AwsClients/Pinpoint/getInAppMessages.js":
/*!***************************************************************!*\
  !*** ../core/lib-esm/AwsClients/Pinpoint/getInAppMessages.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getInAppMessages=void 0;var _authenticated=__webpack_require__(/*! ../../clients/handlers/authenticated */ "../core/lib-esm/clients/handlers/authenticated.js");var _composeServiceApi=__webpack_require__(/*! ../../clients/internal/composeServiceApi */ "../core/lib-esm/clients/internal/composeServiceApi.js");var _extendedEncodeURIComponent=__webpack_require__(/*! ../../clients/middleware/signing/utils/extendedEncodeURIComponent */ "../core/lib-esm/clients/middleware/signing/utils/extendedEncodeURIComponent.js");var _serde=__webpack_require__(/*! ../../clients/serde */ "../core/lib-esm/clients/serde/index.js");var _base=__webpack_require__(/*! ./base */ "../core/lib-esm/AwsClients/Pinpoint/base.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var getInAppMessagesSerializer=function getInAppMessagesSerializer(_a,endpoint){var ApplicationId=_a.ApplicationId,EndpointId=_a.EndpointId;var headers=(0,_base.getSharedHeaders)();var url=new URL(endpoint.url);url.pathname="v1/apps/".concat((0,_extendedEncodeURIComponent.extendedEncodeURIComponent)(ApplicationId),"/endpoints/").concat((0,_extendedEncodeURIComponent.extendedEncodeURIComponent)(EndpointId),"/inappmessages");return{method:'GET',headers:headers,url:url};};var getInAppMessagesDeserializer=function getInAppMessagesDeserializer(response){return __awaiter(void 0,void 0,void 0,function(){var error,InAppMessageCampaigns;return __generator(this,function(_a){switch(_a.label){case 0:if(!(response.statusCode>=300))return[3,2];return[4,(0,_serde.parseJsonError)(response)];case 1:error=_a.sent();throw error;case 2:return[4,(0,_serde.parseJsonBody)(response)];case 3:InAppMessageCampaigns=_a.sent().InAppMessageCampaigns;return[2,{InAppMessagesResponse:{InAppMessageCampaigns:InAppMessageCampaigns},$metadata:(0,_serde.parseMetadata)(response)}];}});});};var getInAppMessages=(0,_composeServiceApi.composeServiceApi)(_authenticated.authenticatedHandler,getInAppMessagesSerializer,getInAppMessagesDeserializer,_base.defaultConfig);exports.getInAppMessages=getInAppMessages;

/***/ }),

/***/ "../core/lib-esm/AwsClients/Pinpoint/index.js":
/*!****************************************************!*\
  !*** ../core/lib-esm/AwsClients/Pinpoint/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "getInAppMessages", ({enumerable:true,get:function get(){return _getInAppMessages.getInAppMessages;}}));Object.defineProperty(exports, "putEvents", ({enumerable:true,get:function get(){return _putEvents.putEvents;}}));Object.defineProperty(exports, "updateEndpoint", ({enumerable:true,get:function get(){return _updateEndpoint.updateEndpoint;}}));var _getInAppMessages=__webpack_require__(/*! ./getInAppMessages */ "../core/lib-esm/AwsClients/Pinpoint/getInAppMessages.js");var _putEvents=__webpack_require__(/*! ./putEvents */ "../core/lib-esm/AwsClients/Pinpoint/putEvents.js");var _updateEndpoint=__webpack_require__(/*! ./updateEndpoint */ "../core/lib-esm/AwsClients/Pinpoint/updateEndpoint.js");

/***/ }),

/***/ "../core/lib-esm/AwsClients/Pinpoint/putEvents.js":
/*!********************************************************!*\
  !*** ../core/lib-esm/AwsClients/Pinpoint/putEvents.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.putEvents=void 0;var _authenticated=__webpack_require__(/*! ../../clients/handlers/authenticated */ "../core/lib-esm/clients/handlers/authenticated.js");var _composeServiceApi=__webpack_require__(/*! ../../clients/internal/composeServiceApi */ "../core/lib-esm/clients/internal/composeServiceApi.js");var _extendedEncodeURIComponent=__webpack_require__(/*! ../../clients/middleware/signing/utils/extendedEncodeURIComponent */ "../core/lib-esm/clients/middleware/signing/utils/extendedEncodeURIComponent.js");var _serde=__webpack_require__(/*! ../../clients/serde */ "../core/lib-esm/clients/serde/index.js");var _base=__webpack_require__(/*! ./base */ "../core/lib-esm/AwsClients/Pinpoint/base.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var putEventsSerializer=function putEventsSerializer(_a,endpoint){var ApplicationId=_a.ApplicationId,EventsRequest=_a.EventsRequest;var headers=(0,_base.getSharedHeaders)();var url=new URL(endpoint.url);url.pathname="v1/apps/".concat((0,_extendedEncodeURIComponent.extendedEncodeURIComponent)(ApplicationId),"/events");var body=JSON.stringify(EventsRequest!==null&&EventsRequest!==void 0?EventsRequest:{});return{method:'POST',headers:headers,url:url,body:body};};var putEventsDeserializer=function putEventsDeserializer(response){return __awaiter(void 0,void 0,void 0,function(){var error,Results;return __generator(this,function(_a){switch(_a.label){case 0:if(!(response.statusCode>=300))return[3,2];return[4,(0,_serde.parseJsonError)(response)];case 1:error=_a.sent();throw error;case 2:return[4,(0,_serde.parseJsonBody)(response)];case 3:Results=_a.sent().Results;return[2,{EventsResponse:{Results:Results},$metadata:(0,_serde.parseMetadata)(response)}];}});});};var putEvents=(0,_composeServiceApi.composeServiceApi)(_authenticated.authenticatedHandler,putEventsSerializer,putEventsDeserializer,_base.defaultConfig);exports.putEvents=putEvents;

/***/ }),

/***/ "../core/lib-esm/AwsClients/Pinpoint/updateEndpoint.js":
/*!*************************************************************!*\
  !*** ../core/lib-esm/AwsClients/Pinpoint/updateEndpoint.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.updateEndpoint=void 0;var _authenticated=__webpack_require__(/*! ../../clients/handlers/authenticated */ "../core/lib-esm/clients/handlers/authenticated.js");var _composeServiceApi=__webpack_require__(/*! ../../clients/internal/composeServiceApi */ "../core/lib-esm/clients/internal/composeServiceApi.js");var _extendedEncodeURIComponent=__webpack_require__(/*! ../../clients/middleware/signing/utils/extendedEncodeURIComponent */ "../core/lib-esm/clients/middleware/signing/utils/extendedEncodeURIComponent.js");var _serde=__webpack_require__(/*! ../../clients/serde */ "../core/lib-esm/clients/serde/index.js");var _base=__webpack_require__(/*! ./base */ "../core/lib-esm/AwsClients/Pinpoint/base.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var updateEndpointSerializer=function updateEndpointSerializer(_a,endpoint){var ApplicationId=_a.ApplicationId,EndpointId=_a.EndpointId,EndpointRequest=_a.EndpointRequest;var headers=(0,_base.getSharedHeaders)();var url=new URL(endpoint.url);url.pathname="v1/apps/".concat((0,_extendedEncodeURIComponent.extendedEncodeURIComponent)(ApplicationId),"/endpoints/").concat((0,_extendedEncodeURIComponent.extendedEncodeURIComponent)(EndpointId));var body=JSON.stringify(EndpointRequest!==null&&EndpointRequest!==void 0?EndpointRequest:{});return{method:'PUT',headers:headers,url:url,body:body};};var updateEndpointDeserializer=function updateEndpointDeserializer(response){return __awaiter(void 0,void 0,void 0,function(){var error,_a,Message,RequestID;return __generator(this,function(_b){switch(_b.label){case 0:if(!(response.statusCode>=300))return[3,2];return[4,(0,_serde.parseJsonError)(response)];case 1:error=_b.sent();throw error;case 2:return[4,(0,_serde.parseJsonBody)(response)];case 3:_a=_b.sent(),Message=_a.Message,RequestID=_a.RequestID;return[2,{MessageBody:{Message:Message,RequestID:RequestID},$metadata:(0,_serde.parseMetadata)(response)}];}});});};var updateEndpoint=(0,_composeServiceApi.composeServiceApi)(_authenticated.authenticatedHandler,updateEndpointSerializer,updateEndpointDeserializer,_base.defaultConfig);exports.updateEndpoint=updateEndpoint;

/***/ }),

/***/ "../core/lib-esm/Logger/ConsoleLogger.js":
/*!***********************************************!*\
  !*** ../core/lib-esm/Logger/ConsoleLogger.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.LOG_TYPE=exports.ConsoleLogger=void 0;var _Constants=__webpack_require__(/*! ../Util/Constants */ "../core/lib-esm/Util/Constants.js");var __values=this&&this.__values||function(o){var s=typeof Symbol==="function"&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&typeof o.length==="number")return{next:function next(){if(o&&i>=o.length)o=void 0;return{value:o&&o[i++],done:!o};}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.");};var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var __spreadArray=this&&this.__spreadArray||function(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i];}}return to.concat(ar||Array.prototype.slice.call(from));};var LOG_LEVELS={VERBOSE:1,DEBUG:2,INFO:3,WARN:4,ERROR:5};var LOG_TYPE;exports.LOG_TYPE=LOG_TYPE;(function(LOG_TYPE){LOG_TYPE["DEBUG"]="DEBUG";LOG_TYPE["ERROR"]="ERROR";LOG_TYPE["INFO"]="INFO";LOG_TYPE["WARN"]="WARN";LOG_TYPE["VERBOSE"]="VERBOSE";})(LOG_TYPE||(exports.LOG_TYPE=LOG_TYPE={}));var ConsoleLogger=function(){function ConsoleLogger(name,level){if(level===void 0){level=LOG_TYPE.WARN;}this.name=name;this.level=level;this._pluggables=[];}ConsoleLogger.prototype._padding=function(n){return n<10?'0'+n:''+n;};ConsoleLogger.prototype._ts=function(){var dt=new Date();return[this._padding(dt.getMinutes()),this._padding(dt.getSeconds())].join(':')+'.'+dt.getMilliseconds();};ConsoleLogger.prototype.configure=function(config){if(!config)return this._config;this._config=config;return this._config;};ConsoleLogger.prototype._log=function(type){var e_1,_a;var msg=[];for(var _i=1;_i<arguments.length;_i++){msg[_i-1]=arguments[_i];}var logger_level_name=this.level;if(ConsoleLogger.LOG_LEVEL){logger_level_name=ConsoleLogger.LOG_LEVEL;}if(typeof window!=='undefined'&&window.LOG_LEVEL){logger_level_name=window.LOG_LEVEL;}var logger_level=LOG_LEVELS[logger_level_name];var type_level=LOG_LEVELS[type];if(!(type_level>=logger_level)){return;}var log=console.log.bind(console);if(type===LOG_TYPE.ERROR&&console.error){log=console.error.bind(console);}if(type===LOG_TYPE.WARN&&console.warn){log=console.warn.bind(console);}var prefix="[".concat(type,"] ").concat(this._ts()," ").concat(this.name);var message='';if(msg.length===1&&typeof msg[0]==='string'){message="".concat(prefix," - ").concat(msg[0]);log(message);}else if(msg.length===1){message="".concat(prefix," ").concat(msg[0]);log(prefix,msg[0]);}else if(typeof msg[0]==='string'){var obj=msg.slice(1);if(obj.length===1){obj=obj[0];}message="".concat(prefix," - ").concat(msg[0]," ").concat(obj);log("".concat(prefix," - ").concat(msg[0]),obj);}else{message="".concat(prefix," ").concat(msg);log(prefix,msg);}try{for(var _b=__values(this._pluggables),_c=_b.next();!_c.done;_c=_b.next()){var plugin=_c.value;var logEvent={message:message,timestamp:Date.now()};plugin.pushLogs([logEvent]);}}catch(e_1_1){e_1={error:e_1_1};}finally{try{if(_c&&!_c.done&&(_a=_b["return"]))_a.call(_b);}finally{if(e_1)throw e_1.error;}}};ConsoleLogger.prototype.log=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.INFO],__read(msg),false));};ConsoleLogger.prototype.info=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.INFO],__read(msg),false));};ConsoleLogger.prototype.warn=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.WARN],__read(msg),false));};ConsoleLogger.prototype.error=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.ERROR],__read(msg),false));};ConsoleLogger.prototype.debug=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.DEBUG],__read(msg),false));};ConsoleLogger.prototype.verbose=function(){var msg=[];for(var _i=0;_i<arguments.length;_i++){msg[_i]=arguments[_i];}this._log.apply(this,__spreadArray([LOG_TYPE.VERBOSE],__read(msg),false));};ConsoleLogger.prototype.addPluggable=function(pluggable){if(pluggable&&pluggable.getCategoryName()===_Constants.AWS_CLOUDWATCH_CATEGORY){this._pluggables.push(pluggable);pluggable.configure(this._config);}};ConsoleLogger.prototype.listPluggables=function(){return this._pluggables;};ConsoleLogger.LOG_LEVEL=null;return ConsoleLogger;}();exports.ConsoleLogger=ConsoleLogger;

/***/ }),

/***/ "../core/lib-esm/Platform/detectFramework.js":
/*!***************************************************!*\
  !*** ../core/lib-esm/Platform/detectFramework.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.clearCache=clearCache;exports.observeFrameworkChanges=exports.frameworkChangeObservers=exports.detectFramework=void 0;var _types=__webpack_require__(/*! ./types */ "../core/lib-esm/Platform/types.js");var _detection=__webpack_require__(/*! ./detection */ "../core/lib-esm/Platform/detection/index.js");var frameworkCache;var frameworkChangeObservers=[];exports.frameworkChangeObservers=frameworkChangeObservers;var resetTriggered=false;var SSR_RESET_TIMEOUT=10;var WEB_RESET_TIMEOUT=10;var PRIME_FRAMEWORK_DELAY=1000;var detectFramework=function detectFramework(){if(!frameworkCache){frameworkCache=(0,_detection.detect)();if(resetTriggered){while(frameworkChangeObservers.length){frameworkChangeObservers.pop()();}}else{frameworkChangeObservers.forEach(function(fcn){return fcn();});}resetTimeout(_types.Framework.ServerSideUnknown,SSR_RESET_TIMEOUT);resetTimeout(_types.Framework.WebUnknown,WEB_RESET_TIMEOUT);}return frameworkCache;};exports.detectFramework=detectFramework;var observeFrameworkChanges=function observeFrameworkChanges(fcn){if(resetTriggered){return;}frameworkChangeObservers.push(fcn);};exports.observeFrameworkChanges=observeFrameworkChanges;function clearCache(){frameworkCache=undefined;}function resetTimeout(framework,delay){if(frameworkCache===framework&&!resetTriggered){setTimeout(function(){clearCache();resetTriggered=true;setTimeout(detectFramework,PRIME_FRAMEWORK_DELAY);},delay);}}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Angular.js":
/*!*****************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Angular.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.angularSSRDetect=angularSSRDetect;exports.angularWebDetect=angularWebDetect;var _typeof2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js"));var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function angularWebDetect(){var angularVersionSetInDocument=Boolean((0,_helpers.documentExists)()&&document.querySelector('[ng-version]'));var angularContentSetInWindow=Boolean((0,_helpers.windowExists)()&&typeof window['ng']!=='undefined');return angularVersionSetInDocument||angularContentSetInWindow;}function angularSSRDetect(){var _a;return(0,_helpers.processExists)()&&(0,_typeof2["default"])(process.env)==='object'&&((_a=process.env['npm_lifecycle_script'])===null||_a===void 0?void 0:_a.startsWith('ng '))||false;}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Expo.js":
/*!**************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Expo.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.expoDetect=expoDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function expoDetect(){return(0,_helpers.globalExists)()&&typeof __webpack_require__.g['expo']!=='undefined';}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Next.js":
/*!**************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Next.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.nextSSRDetect=nextSSRDetect;exports.nextWebDetect=nextWebDetect;var _typeof2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js"));var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function nextWebDetect(){return(0,_helpers.windowExists)()&&window['next']&&(0,_typeof2["default"])(window['next'])==='object';}function nextSSRDetect(){return(0,_helpers.globalExists)()&&((0,_helpers.keyPrefixMatch)(__webpack_require__.g,'__next')||(0,_helpers.keyPrefixMatch)(__webpack_require__.g,'__NEXT'));}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Nuxt.js":
/*!**************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Nuxt.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.nuxtSSRDetect=nuxtSSRDetect;exports.nuxtWebDetect=nuxtWebDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function nuxtWebDetect(){return(0,_helpers.windowExists)()&&(window['__NUXT__']!==undefined||window['$nuxt']!==undefined);}function nuxtSSRDetect(){return(0,_helpers.globalExists)()&&typeof __webpack_require__.g['__NUXT_PATHS__']!=='undefined';}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/React.js":
/*!***************************************************!*\
  !*** ../core/lib-esm/Platform/detection/React.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.reactSSRDetect=reactSSRDetect;exports.reactWebDetect=reactWebDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function reactWebDetect(){var elementKeyPrefixedWithReact=function elementKeyPrefixedWithReact(key){return key.startsWith('_react')||key.startsWith('__react');};var elementIsReactEnabled=function elementIsReactEnabled(element){return Object.keys(element).find(elementKeyPrefixedWithReact);};var allElementsWithId=function allElementsWithId(){return Array.from(document.querySelectorAll('[id]'));};return(0,_helpers.documentExists)()&&allElementsWithId().some(elementIsReactEnabled);}function reactSSRDetect(){return(0,_helpers.processExists)()&&typeof process.env!=='undefined'&&!!Object.keys(process.env).find(function(key){return key.includes('react');});}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/ReactNative.js":
/*!*********************************************************!*\
  !*** ../core/lib-esm/Platform/detection/ReactNative.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.reactNativeDetect=reactNativeDetect;function reactNativeDetect(){return typeof navigator!=='undefined'&&typeof navigator.product!=='undefined'&&navigator.product==='ReactNative';}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Svelte.js":
/*!****************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Svelte.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.svelteSSRDetect=svelteSSRDetect;exports.svelteWebDetect=svelteWebDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function svelteWebDetect(){return(0,_helpers.windowExists)()&&(0,_helpers.keyPrefixMatch)(window,'__SVELTE');}function svelteSSRDetect(){return(0,_helpers.processExists)()&&typeof process.env!=='undefined'&&!!Object.keys(process.env).find(function(key){return key.includes('svelte');});}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Vue.js":
/*!*************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Vue.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.vueSSRDetect=vueSSRDetect;exports.vueWebDetect=vueWebDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function vueWebDetect(){return(0,_helpers.windowExists)()&&(0,_helpers.keyPrefixMatch)(window,'__VUE');}function vueSSRDetect(){return(0,_helpers.globalExists)()&&(0,_helpers.keyPrefixMatch)(__webpack_require__.g,'__VUE');}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/Web.js":
/*!*************************************************!*\
  !*** ../core/lib-esm/Platform/detection/Web.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.webDetect=webDetect;var _helpers=__webpack_require__(/*! ./helpers */ "../core/lib-esm/Platform/detection/helpers.js");function webDetect(){return(0,_helpers.windowExists)();}

/***/ }),

/***/ "../core/lib-esm/Platform/detection/helpers.js":
/*!*****************************************************!*\
  !*** ../core/lib-esm/Platform/detection/helpers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.windowExists=exports.processExists=exports.keyPrefixMatch=exports.globalThisExists=exports.globalExists=exports.documentExists=void 0;var globalExists=function globalExists(){return typeof __webpack_require__.g!=='undefined';};exports.globalExists=globalExists;var globalThisExists=function globalThisExists(){return typeof globalThis!=='undefined';};exports.globalThisExists=globalThisExists;var windowExists=function windowExists(){return typeof window!=='undefined';};exports.windowExists=windowExists;var documentExists=function documentExists(){return typeof document!=='undefined';};exports.documentExists=documentExists;var processExists=function processExists(){return typeof process!=='undefined';};exports.processExists=processExists;var keyPrefixMatch=function keyPrefixMatch(object,prefix){return!!Object.keys(object).find(function(key){return key.startsWith(prefix);});};exports.keyPrefixMatch=keyPrefixMatch;

/***/ }),

/***/ "../core/lib-esm/Platform/detection/index.js":
/*!***************************************************!*\
  !*** ../core/lib-esm/Platform/detection/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.detect=detect;var _types=__webpack_require__(/*! ../types */ "../core/lib-esm/Platform/types.js");var _React=__webpack_require__(/*! ./React */ "../core/lib-esm/Platform/detection/React.js");var _Vue=__webpack_require__(/*! ./Vue */ "../core/lib-esm/Platform/detection/Vue.js");var _Svelte=__webpack_require__(/*! ./Svelte */ "../core/lib-esm/Platform/detection/Svelte.js");var _Next=__webpack_require__(/*! ./Next */ "../core/lib-esm/Platform/detection/Next.js");var _Nuxt=__webpack_require__(/*! ./Nuxt */ "../core/lib-esm/Platform/detection/Nuxt.js");var _Angular=__webpack_require__(/*! ./Angular */ "../core/lib-esm/Platform/detection/Angular.js");var _ReactNative=__webpack_require__(/*! ./ReactNative */ "../core/lib-esm/Platform/detection/ReactNative.js");var _Expo=__webpack_require__(/*! ./Expo */ "../core/lib-esm/Platform/detection/Expo.js");var _Web=__webpack_require__(/*! ./Web */ "../core/lib-esm/Platform/detection/Web.js");var detectionMap=[{platform:_types.Framework.Expo,detectionMethod:_Expo.expoDetect},{platform:_types.Framework.ReactNative,detectionMethod:_ReactNative.reactNativeDetect},{platform:_types.Framework.NextJs,detectionMethod:_Next.nextWebDetect},{platform:_types.Framework.Nuxt,detectionMethod:_Nuxt.nuxtWebDetect},{platform:_types.Framework.Angular,detectionMethod:_Angular.angularWebDetect},{platform:_types.Framework.React,detectionMethod:_React.reactWebDetect},{platform:_types.Framework.VueJs,detectionMethod:_Vue.vueWebDetect},{platform:_types.Framework.Svelte,detectionMethod:_Svelte.svelteWebDetect},{platform:_types.Framework.WebUnknown,detectionMethod:_Web.webDetect},{platform:_types.Framework.NextJsSSR,detectionMethod:_Next.nextSSRDetect},{platform:_types.Framework.NuxtSSR,detectionMethod:_Nuxt.nuxtSSRDetect},{platform:_types.Framework.ReactSSR,detectionMethod:_React.reactSSRDetect},{platform:_types.Framework.VueJsSSR,detectionMethod:_Vue.vueSSRDetect},{platform:_types.Framework.AngularSSR,detectionMethod:_Angular.angularSSRDetect},{platform:_types.Framework.SvelteSSR,detectionMethod:_Svelte.svelteSSRDetect}];function detect(){var _a;return((_a=detectionMap.find(function(detectionEntry){return detectionEntry.detectionMethod();}))===null||_a===void 0?void 0:_a.platform)||_types.Framework.ServerSideUnknown;}

/***/ }),

/***/ "../core/lib-esm/Platform/index.js":
/*!*****************************************!*\
  !*** ../core/lib-esm/Platform/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getAmplifyUserAgentObject=exports.getAmplifyUserAgent=exports.Platform=void 0;var _types=__webpack_require__(/*! ./types */ "../core/lib-esm/Platform/types.js");var _version=__webpack_require__(/*! ./version */ "../core/lib-esm/Platform/version.js");var _detectFramework=__webpack_require__(/*! ./detectFramework */ "../core/lib-esm/Platform/detectFramework.js");var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var BASE_USER_AGENT="aws-amplify";var PlatformBuilder=function(){function PlatformBuilder(){this.userAgent="".concat(BASE_USER_AGENT,"/").concat(_version.version);}Object.defineProperty(PlatformBuilder.prototype,"framework",{get:function get(){return(0,_detectFramework.detectFramework)();},enumerable:false,configurable:true});Object.defineProperty(PlatformBuilder.prototype,"isReactNative",{get:function get(){return this.framework===_types.Framework.ReactNative||this.framework===_types.Framework.Expo;},enumerable:false,configurable:true});PlatformBuilder.prototype.observeFrameworkChanges=function(fcn){(0,_detectFramework.observeFrameworkChanges)(fcn);};return PlatformBuilder;}();var Platform=new PlatformBuilder();exports.Platform=Platform;var getAmplifyUserAgentObject=function getAmplifyUserAgentObject(_a){var _b=_a===void 0?{}:_a,category=_b.category,action=_b.action,framework=_b.framework;var userAgent=[[BASE_USER_AGENT,_version.version]];if(category){userAgent.push([category,action]);}userAgent.push(['framework',(0,_detectFramework.detectFramework)()]);return userAgent;};exports.getAmplifyUserAgentObject=getAmplifyUserAgentObject;var getAmplifyUserAgent=function getAmplifyUserAgent(customUserAgentDetails){var userAgent=getAmplifyUserAgentObject(customUserAgentDetails);var userAgentString=userAgent.map(function(_a){var _b=__read(_a,2),agentKey=_b[0],agentValue=_b[1];return"".concat(agentKey,"/").concat(agentValue);}).join(' ');return userAgentString;};exports.getAmplifyUserAgent=getAmplifyUserAgent;

/***/ }),

/***/ "../core/lib-esm/Platform/types.js":
/*!*****************************************!*\
  !*** ../core/lib-esm/Platform/types.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.StorageAction=exports.PushNotificationAction=exports.PubSubAction=exports.PredictionsAction=exports.InteractionsAction=exports.InAppMessagingAction=exports.GeoAction=exports.Framework=exports.DataStoreAction=exports.Category=exports.AuthAction=exports.ApiAction=exports.AnalyticsAction=void 0;var Framework;exports.Framework=Framework;(function(Framework){Framework["WebUnknown"]="0";Framework["React"]="1";Framework["NextJs"]="2";Framework["Angular"]="3";Framework["VueJs"]="4";Framework["Nuxt"]="5";Framework["Svelte"]="6";Framework["ServerSideUnknown"]="100";Framework["ReactSSR"]="101";Framework["NextJsSSR"]="102";Framework["AngularSSR"]="103";Framework["VueJsSSR"]="104";Framework["NuxtSSR"]="105";Framework["SvelteSSR"]="106";Framework["ReactNative"]="201";Framework["Expo"]="202";})(Framework||(exports.Framework=Framework={}));var Category;exports.Category=Category;(function(Category){Category["API"]="api";Category["Auth"]="auth";Category["Analytics"]="analytics";Category["DataStore"]="datastore";Category["Geo"]="geo";Category["InAppMessaging"]="inappmessaging";Category["Interactions"]="interactions";Category["Predictions"]="predictions";Category["PubSub"]="pubsub";Category["PushNotification"]="pushnotification";Category["Storage"]="storage";})(Category||(exports.Category=Category={}));var AnalyticsAction;exports.AnalyticsAction=AnalyticsAction;(function(AnalyticsAction){AnalyticsAction["Record"]="1";AnalyticsAction["UpdateEndpoint"]="2";})(AnalyticsAction||(exports.AnalyticsAction=AnalyticsAction={}));var ApiAction;exports.ApiAction=ApiAction;(function(ApiAction){ApiAction["GraphQl"]="1";ApiAction["Get"]="2";ApiAction["Post"]="3";ApiAction["Put"]="4";ApiAction["Patch"]="5";ApiAction["Del"]="6";ApiAction["Head"]="7";})(ApiAction||(exports.ApiAction=ApiAction={}));var AuthAction;exports.AuthAction=AuthAction;(function(AuthAction){AuthAction["FederatedSignIn"]="30";})(AuthAction||(exports.AuthAction=AuthAction={}));var DataStoreAction;exports.DataStoreAction=DataStoreAction;(function(DataStoreAction){DataStoreAction["Subscribe"]="1";DataStoreAction["GraphQl"]="2";})(DataStoreAction||(exports.DataStoreAction=DataStoreAction={}));var GeoAction;exports.GeoAction=GeoAction;(function(GeoAction){GeoAction["None"]="0";})(GeoAction||(exports.GeoAction=GeoAction={}));var InAppMessagingAction;exports.InAppMessagingAction=InAppMessagingAction;(function(InAppMessagingAction){InAppMessagingAction["None"]="0";})(InAppMessagingAction||(exports.InAppMessagingAction=InAppMessagingAction={}));var InteractionsAction;exports.InteractionsAction=InteractionsAction;(function(InteractionsAction){InteractionsAction["None"]="0";})(InteractionsAction||(exports.InteractionsAction=InteractionsAction={}));var PredictionsAction;exports.PredictionsAction=PredictionsAction;(function(PredictionsAction){PredictionsAction["Convert"]="1";PredictionsAction["Identify"]="2";PredictionsAction["Interpret"]="3";})(PredictionsAction||(exports.PredictionsAction=PredictionsAction={}));var PubSubAction;exports.PubSubAction=PubSubAction;(function(PubSubAction){PubSubAction["Subscribe"]="1";})(PubSubAction||(exports.PubSubAction=PubSubAction={}));var PushNotificationAction;exports.PushNotificationAction=PushNotificationAction;(function(PushNotificationAction){PushNotificationAction["None"]="0";})(PushNotificationAction||(exports.PushNotificationAction=PushNotificationAction={}));var StorageAction;exports.StorageAction=StorageAction;(function(StorageAction){StorageAction["Put"]="1";StorageAction["Get"]="2";StorageAction["List"]="3";StorageAction["Copy"]="4";StorageAction["Remove"]="5";StorageAction["GetProperties"]="6";})(StorageAction||(exports.StorageAction=StorageAction={}));

/***/ }),

/***/ "../core/lib-esm/Platform/version.js":
/*!*******************************************!*\
  !*** ../core/lib-esm/Platform/version.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.version=void 0;var version='5.3.12';exports.version=version;

/***/ }),

/***/ "../core/lib-esm/Util/Constants.js":
/*!*****************************************!*\
  !*** ../core/lib-esm/Util/Constants.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.RETRY_ERROR_CODES=exports.NO_CREDS_ERROR_STRING=exports.AWS_CLOUDWATCH_PROVIDER_NAME=exports.AWS_CLOUDWATCH_MAX_EVENT_SIZE=exports.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE=exports.AWS_CLOUDWATCH_CATEGORY=exports.AWS_CLOUDWATCH_BASE_BUFFER_SIZE=void 0;var AWS_CLOUDWATCH_BASE_BUFFER_SIZE=26;exports.AWS_CLOUDWATCH_BASE_BUFFER_SIZE=AWS_CLOUDWATCH_BASE_BUFFER_SIZE;var AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE=1048576;exports.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE=AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE;var AWS_CLOUDWATCH_MAX_EVENT_SIZE=256000;exports.AWS_CLOUDWATCH_MAX_EVENT_SIZE=AWS_CLOUDWATCH_MAX_EVENT_SIZE;var AWS_CLOUDWATCH_CATEGORY='Logging';exports.AWS_CLOUDWATCH_CATEGORY=AWS_CLOUDWATCH_CATEGORY;var AWS_CLOUDWATCH_PROVIDER_NAME='AWSCloudWatch';exports.AWS_CLOUDWATCH_PROVIDER_NAME=AWS_CLOUDWATCH_PROVIDER_NAME;var NO_CREDS_ERROR_STRING='No credentials';exports.NO_CREDS_ERROR_STRING=NO_CREDS_ERROR_STRING;var RETRY_ERROR_CODES=['ResourceNotFoundException','InvalidSequenceTokenException'];exports.RETRY_ERROR_CODES=RETRY_ERROR_CODES;

/***/ }),

/***/ "../core/lib-esm/Util/Retry.js":
/*!*************************************!*\
  !*** ../core/lib-esm/Util/Retry.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.isNonRetryableError=exports.NonRetryableError=void 0;exports.jitteredBackoff=jitteredBackoff;exports.jitteredExponentialRetry=void 0;exports.retry=retry;var _typeof2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js"));var _ConsoleLogger=__webpack_require__(/*! ../Logger/ConsoleLogger */ "../core/lib-esm/Logger/ConsoleLogger.js");var __extends=this&&this.__extends||function(){var _extendStatics=function extendStatics(d,b){_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return _extendStatics(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");_extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};}();var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var __spreadArray=this&&this.__spreadArray||function(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i];}}return to.concat(ar||Array.prototype.slice.call(from));};var logger=new _ConsoleLogger.ConsoleLogger('Util');var NonRetryableError=function(_super){__extends(NonRetryableError,_super);function NonRetryableError(message){var _this=_super.call(this,message)||this;_this.nonRetryable=true;return _this;}return NonRetryableError;}(Error);exports.NonRetryableError=NonRetryableError;var isNonRetryableError=function isNonRetryableError(obj){var key='nonRetryable';return obj&&obj[key];};exports.isNonRetryableError=isNonRetryableError;function retry(functionToRetry,args,delayFn,onTerminate){return __awaiter(this,void 0,void 0,function(){var _this=this;return __generator(this,function(_a){if(typeof functionToRetry!=='function'){throw Error('functionToRetry must be a function');}return[2,new Promise(function(resolve,reject){return __awaiter(_this,void 0,void 0,function(){var attempt,terminated,timeout,wakeUp,lastError,_loop_1,state_1;return __generator(this,function(_a){switch(_a.label){case 0:attempt=0;terminated=false;wakeUp=function wakeUp(){};onTerminate&&onTerminate.then(function(){terminated=true;clearTimeout(timeout);wakeUp();});_loop_1=function _loop_1(){var _b,_c,err_1,retryIn_1;return __generator(this,function(_d){switch(_d.label){case 0:attempt++;logger.debug("".concat(functionToRetry.name," attempt #").concat(attempt," with this vars: ").concat(JSON.stringify(args)));_d.label=1;case 1:_d.trys.push([1,3,,7]);_b={};_c=resolve;return[4,functionToRetry.apply(void 0,__spreadArray([],__read(args),false))];case 2:return[2,(_b.value=_c.apply(void 0,[_d.sent()]),_b)];case 3:err_1=_d.sent();lastError=err_1;logger.debug("error on ".concat(functionToRetry.name),err_1);if(isNonRetryableError(err_1)){logger.debug("".concat(functionToRetry.name," non retryable error"),err_1);return[2,{value:reject(err_1)}];}retryIn_1=delayFn(attempt,args,err_1);logger.debug("".concat(functionToRetry.name," retrying in ").concat(retryIn_1," ms"));if(!(retryIn_1===false||terminated))return[3,4];return[2,{value:reject(err_1)}];case 4:return[4,new Promise(function(r){wakeUp=r;timeout=setTimeout(wakeUp,retryIn_1);})];case 5:_d.sent();_d.label=6;case 6:return[3,7];case 7:return[2];}});};_a.label=1;case 1:if(!!terminated)return[3,3];return[5,_loop_1()];case 2:state_1=_a.sent();if((0,_typeof2["default"])(state_1)==="object")return[2,state_1.value];return[3,1];case 3:reject(lastError);return[2];}});});})];});});}var MAX_DELAY_MS=5*60*1000;function jitteredBackoff(maxDelayMs){if(maxDelayMs===void 0){maxDelayMs=MAX_DELAY_MS;}var BASE_TIME_MS=100;var JITTER_FACTOR=100;return function(attempt){var delay=Math.pow(2,attempt)*BASE_TIME_MS+JITTER_FACTOR*Math.random();return delay>maxDelayMs?false:delay;};}var jitteredExponentialRetry=function jitteredExponentialRetry(functionToRetry,args,maxDelayMs,onTerminate){if(maxDelayMs===void 0){maxDelayMs=MAX_DELAY_MS;}return retry(functionToRetry,args,jitteredBackoff(maxDelayMs),onTerminate);};exports.jitteredExponentialRetry=jitteredExponentialRetry;

/***/ }),

/***/ "../core/lib-esm/clients/endpoints/getDnsSuffix.js":
/*!*********************************************************!*\
  !*** ../core/lib-esm/clients/endpoints/getDnsSuffix.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getDnsSuffix=void 0;var _partitions=__webpack_require__(/*! ./partitions */ "../core/lib-esm/clients/endpoints/partitions.js");var __values=this&&this.__values||function(o){var s=typeof Symbol==="function"&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&typeof o.length==="number")return{next:function next(){if(o&&i>=o.length)o=void 0;return{value:o&&o[i++],done:!o};}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.");};var getDnsSuffix=function getDnsSuffix(region){var e_1,_a;var partitions=_partitions.partitionsInfo.partitions;try{for(var partitions_1=__values(partitions),partitions_1_1=partitions_1.next();!partitions_1_1.done;partitions_1_1=partitions_1.next()){var _b=partitions_1_1.value,regions=_b.regions,outputs=_b.outputs,regionRegex=_b.regionRegex;var regex=new RegExp(regionRegex);if(regions.includes(region)||regex.test(region)){return outputs.dnsSuffix;}}}catch(e_1_1){e_1={error:e_1_1};}finally{try{if(partitions_1_1&&!partitions_1_1.done&&(_a=partitions_1["return"]))_a.call(partitions_1);}finally{if(e_1)throw e_1.error;}}return _partitions.defaultPartition.outputs.dnsSuffix;};exports.getDnsSuffix=getDnsSuffix;

/***/ }),

/***/ "../core/lib-esm/clients/endpoints/index.js":
/*!**************************************************!*\
  !*** ../core/lib-esm/clients/endpoints/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "getDnsSuffix", ({enumerable:true,get:function get(){return _getDnsSuffix.getDnsSuffix;}}));var _getDnsSuffix=__webpack_require__(/*! ./getDnsSuffix */ "../core/lib-esm/clients/endpoints/getDnsSuffix.js");

/***/ }),

/***/ "../core/lib-esm/clients/endpoints/partitions.js":
/*!*******************************************************!*\
  !*** ../core/lib-esm/clients/endpoints/partitions.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.partitionsInfo=exports.defaultPartition=void 0;var defaultPartition={id:'aws',outputs:{dnsSuffix:'amazonaws.com'},regionRegex:'^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$',regions:['aws-global']};exports.defaultPartition=defaultPartition;var partitionsInfo={partitions:[defaultPartition,{id:'aws-cn',outputs:{dnsSuffix:'amazonaws.com.cn'},regionRegex:'^cn\\-\\w+\\-\\d+$',regions:['aws-cn-global']}]};exports.partitionsInfo=partitionsInfo;

/***/ }),

/***/ "../core/lib-esm/clients/handlers/authenticated.js":
/*!*********************************************************!*\
  !*** ../core/lib-esm/clients/handlers/authenticated.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.authenticatedHandler=void 0;var _retry=__webpack_require__(/*! ../middleware/retry */ "../core/lib-esm/clients/middleware/retry/index.js");var _signing=__webpack_require__(/*! ../middleware/signing */ "../core/lib-esm/clients/middleware/signing/index.js");var _userAgent=__webpack_require__(/*! ../middleware/userAgent */ "../core/lib-esm/clients/middleware/userAgent/index.js");var _composeTransferHandler=__webpack_require__(/*! ../internal/composeTransferHandler */ "../core/lib-esm/clients/internal/composeTransferHandler.js");var _fetch=__webpack_require__(/*! ./fetch */ "../core/lib-esm/clients/handlers/fetch.js");var authenticatedHandler=(0,_composeTransferHandler.composeTransferHandler)(_fetch.fetchTransferHandler,[_userAgent.userAgentMiddleware,_retry.retryMiddleware,_signing.signingMiddleware]);exports.authenticatedHandler=authenticatedHandler;

/***/ }),

/***/ "../core/lib-esm/clients/handlers/fetch.js":
/*!*************************************************!*\
  !*** ../core/lib-esm/clients/handlers/fetch.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.fetchTransferHandler=void 0;var _extends2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js"));__webpack_require__(/*! isomorphic-unfetch */ "../../node_modules/isomorphic-unfetch/browser.js");var _memoization=__webpack_require__(/*! ../utils/memoization */ "../core/lib-esm/clients/utils/memoization.js");var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var shouldSendBody=function shouldSendBody(method){return!['HEAD','GET','DELETE'].includes(method.toUpperCase());};var fetchTransferHandler=function fetchTransferHandler(_a,_b){var url=_a.url,method=_a.method,headers=_a.headers,body=_a.body;var abortSignal=_b.abortSignal;return __awaiter(void 0,void 0,void 0,function(){var resp,e_1,responseHeaders,httpResponse,bodyWithMixin;var _c,_d;return __generator(this,function(_e){switch(_e.label){case 0:_e.trys.push([0,2,,3]);return[4,fetch(url,{method:method,headers:headers,body:shouldSendBody(method)?body:undefined,signal:abortSignal})];case 1:resp=_e.sent();return[3,3];case 2:e_1=_e.sent();if(e_1 instanceof TypeError){throw new Error('Network error');}throw e_1;case 3:responseHeaders={};(_c=resp.headers)===null||_c===void 0?void 0:_c.forEach(function(value,key){responseHeaders[key.toLowerCase()]=value;});httpResponse={statusCode:resp.status,headers:responseHeaders,body:null};bodyWithMixin=(0,_extends2["default"])((_d=resp.body)!==null&&_d!==void 0?_d:{},{text:(0,_memoization.withMemoization)(function(){return resp.text();}),blob:(0,_memoization.withMemoization)(function(){return resp.blob();}),json:(0,_memoization.withMemoization)(function(){return resp.json();})});return[2,__assign(__assign({},httpResponse),{body:bodyWithMixin})];}});});};exports.fetchTransferHandler=fetchTransferHandler;

/***/ }),

/***/ "../core/lib-esm/clients/internal/composeServiceApi.js":
/*!*************************************************************!*\
  !*** ../core/lib-esm/clients/internal/composeServiceApi.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.composeServiceApi=void 0;var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var composeServiceApi=function composeServiceApi(transferHandler,serializer,deserializer,defaultConfig){return function(config,input){return __awaiter(void 0,void 0,void 0,function(){var resolvedConfig,endpoint,request,response;return __generator(this,function(_a){switch(_a.label){case 0:resolvedConfig=__assign(__assign({},defaultConfig),config);return[4,resolvedConfig.endpointResolver(resolvedConfig,input)];case 1:endpoint=_a.sent();return[4,serializer(input,endpoint)];case 2:request=_a.sent();return[4,transferHandler(request,__assign({},resolvedConfig))];case 3:response=_a.sent();return[4,deserializer(response)];case 4:return[2,_a.sent()];}});});};};exports.composeServiceApi=composeServiceApi;

/***/ }),

/***/ "../core/lib-esm/clients/internal/composeTransferHandler.js":
/*!******************************************************************!*\
  !*** ../core/lib-esm/clients/internal/composeTransferHandler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.composeTransferHandler=void 0;var composeTransferHandler=function composeTransferHandler(coreHandler,middleware){return function(request,options){var context={};var composedHandler=function composedHandler(request){return coreHandler(request,options);};for(var i=middleware.length-1;i>=0;i--){var m=middleware[i];var resolvedMiddleware=m(options);composedHandler=resolvedMiddleware(composedHandler,context);}return composedHandler(request);};};exports.composeTransferHandler=composeTransferHandler;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/retry/defaultRetryDecider.js":
/*!***********************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/retry/defaultRetryDecider.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getRetryDecider=void 0;var _isClockSkewError=__webpack_require__(/*! ./isClockSkewError */ "../core/lib-esm/clients/middleware/retry/isClockSkewError.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var getRetryDecider=function getRetryDecider(errorParser){return function(response,error){return __awaiter(void 0,void 0,void 0,function(){var errorCode,_a,statusCode;var _b;return __generator(this,function(_c){switch(_c.label){case 0:if(!(error!==null&&error!==void 0))return[3,1];_a=error;return[3,3];case 1:return[4,errorParser(response)];case 2:_a=_c.sent();_c.label=3;case 3:errorCode=((_b=_a)!==null&&_b!==void 0?_b:{}).name;statusCode=response===null||response===void 0?void 0:response.statusCode;return[2,isConnectionError(error)||isThrottlingError(statusCode,errorCode)||(0,_isClockSkewError.isClockSkewError)(errorCode)||isServerSideError(statusCode,errorCode)];}});});};};exports.getRetryDecider=getRetryDecider;var THROTTLING_ERROR_CODES=['BandwidthLimitExceeded','EC2ThrottledException','LimitExceededException','PriorRequestNotComplete','ProvisionedThroughputExceededException','RequestLimitExceeded','RequestThrottled','RequestThrottledException','SlowDown','ThrottledException','Throttling','ThrottlingException','TooManyRequestsException'];var TIMEOUT_ERROR_CODES=['TimeoutError','RequestTimeout','RequestTimeoutException'];var isThrottlingError=function isThrottlingError(statusCode,errorCode){return statusCode===429||THROTTLING_ERROR_CODES.includes(errorCode);};var isConnectionError=function isConnectionError(error){return(error===null||error===void 0?void 0:error.name)==='Network error';};var isServerSideError=function isServerSideError(statusCode,errorCode){return[500,502,503,504].includes(statusCode)||TIMEOUT_ERROR_CODES.includes(errorCode);};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/retry/index.js":
/*!*********************************************************!*\
  !*** ../core/lib-esm/clients/middleware/retry/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "getRetryDecider", ({enumerable:true,get:function get(){return _defaultRetryDecider.getRetryDecider;}}));Object.defineProperty(exports, "jitteredBackoff", ({enumerable:true,get:function get(){return _jitteredBackoff.jitteredBackoff;}}));Object.defineProperty(exports, "retryMiddleware", ({enumerable:true,get:function get(){return _middleware.retryMiddleware;}}));var _middleware=__webpack_require__(/*! ./middleware */ "../core/lib-esm/clients/middleware/retry/middleware.js");var _jitteredBackoff=__webpack_require__(/*! ./jitteredBackoff */ "../core/lib-esm/clients/middleware/retry/jitteredBackoff.js");var _defaultRetryDecider=__webpack_require__(/*! ./defaultRetryDecider */ "../core/lib-esm/clients/middleware/retry/defaultRetryDecider.js");

/***/ }),

/***/ "../core/lib-esm/clients/middleware/retry/isClockSkewError.js":
/*!********************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/retry/isClockSkewError.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.isClockSkewError=void 0;var CLOCK_SKEW_ERROR_CODES=['AuthFailure','InvalidSignatureException','RequestExpired','RequestInTheFuture','RequestTimeTooSkewed','SignatureDoesNotMatch','BadRequestException'];var isClockSkewError=function isClockSkewError(errorCode){return CLOCK_SKEW_ERROR_CODES.includes(errorCode);};exports.isClockSkewError=isClockSkewError;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/retry/jitteredBackoff.js":
/*!*******************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/retry/jitteredBackoff.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.jitteredBackoff=void 0;var _Retry=__webpack_require__(/*! ../../../Util/Retry */ "../core/lib-esm/Util/Retry.js");var DEFAULT_MAX_DELAY_MS=5*60*1000;var jitteredBackoff=function jitteredBackoff(attempt){var delayFunction=(0,_Retry.jitteredBackoff)(DEFAULT_MAX_DELAY_MS);var delay=delayFunction(attempt);return delay===false?DEFAULT_MAX_DELAY_MS:delay;};exports.jitteredBackoff=jitteredBackoff;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/retry/middleware.js":
/*!**************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/retry/middleware.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.retryMiddleware=void 0;var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var DEFAULT_RETRY_ATTEMPTS=3;var retryMiddleware=function retryMiddleware(_a){var _b=_a.maxAttempts,maxAttempts=_b===void 0?DEFAULT_RETRY_ATTEMPTS:_b,retryDecider=_a.retryDecider,computeDelay=_a.computeDelay,abortSignal=_a.abortSignal;if(maxAttempts<1){throw new Error('maxAttempts must be greater than 0');}return function(next,context){return function retryMiddleware(request){var _a;return __awaiter(this,void 0,void 0,function(){var error,attemptsCount,response,handleTerminalErrorOrResponse,e_1,delay;return __generator(this,function(_b){switch(_b.label){case 0:attemptsCount=(_a=context.attemptsCount)!==null&&_a!==void 0?_a:0;handleTerminalErrorOrResponse=function handleTerminalErrorOrResponse(){if(response){addOrIncrementMetadataAttempts(response,attemptsCount);return response;}else{addOrIncrementMetadataAttempts(error,attemptsCount);throw error;}};_b.label=1;case 1:if(!(!(abortSignal===null||abortSignal===void 0?void 0:abortSignal.aborted)&&attemptsCount<maxAttempts))return[3,11];_b.label=2;case 2:_b.trys.push([2,4,,5]);return[4,next(request)];case 3:response=_b.sent();error=undefined;return[3,5];case 4:e_1=_b.sent();error=e_1;response=undefined;return[3,5];case 5:attemptsCount=context.attemptsCount>attemptsCount?context.attemptsCount:attemptsCount+1;context.attemptsCount=attemptsCount;return[4,retryDecider(response,error)];case 6:if(!_b.sent())return[3,9];if(!(!(abortSignal===null||abortSignal===void 0?void 0:abortSignal.aborted)&&attemptsCount<maxAttempts))return[3,8];delay=computeDelay(attemptsCount);return[4,cancellableSleep(delay,abortSignal)];case 7:_b.sent();_b.label=8;case 8:return[3,1];case 9:return[2,handleTerminalErrorOrResponse()];case 10:return[3,1];case 11:if(abortSignal===null||abortSignal===void 0?void 0:abortSignal.aborted){throw new Error('Request aborted.');}else{return[2,handleTerminalErrorOrResponse()];}return[2];}});});};};};exports.retryMiddleware=retryMiddleware;var cancellableSleep=function cancellableSleep(timeoutMs,abortSignal){if(abortSignal===null||abortSignal===void 0?void 0:abortSignal.aborted){return Promise.resolve();}var timeoutId;var sleepPromiseResolveFn;var sleepPromise=new Promise(function(resolve){sleepPromiseResolveFn=resolve;timeoutId=setTimeout(resolve,timeoutMs);});abortSignal===null||abortSignal===void 0?void 0:abortSignal.addEventListener('abort',function cancelSleep(event){clearTimeout(timeoutId);abortSignal===null||abortSignal===void 0?void 0:abortSignal.removeEventListener('abort',cancelSleep);sleepPromiseResolveFn();});return sleepPromise;};var addOrIncrementMetadataAttempts=function addOrIncrementMetadataAttempts(nextHandlerOutput,attempts){var _a;if(Object.prototype.toString.call(nextHandlerOutput)!=='[object Object]'){return;}nextHandlerOutput['$metadata']=__assign(__assign({},(_a=nextHandlerOutput['$metadata'])!==null&&_a!==void 0?_a:{}),{attempts:attempts});};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/index.js":
/*!***********************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "signingMiddleware", ({enumerable:true,get:function get(){return _middleware.signingMiddleware;}}));var _middleware=__webpack_require__(/*! ./middleware */ "../core/lib-esm/clients/middleware/signing/middleware.js");

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/middleware.js":
/*!****************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/middleware.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.signingMiddleware=void 0;var _signatureV=__webpack_require__(/*! ./signer/signatureV4 */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/index.js");var _getSkewCorrectedDate=__webpack_require__(/*! ./utils/getSkewCorrectedDate */ "../core/lib-esm/clients/middleware/signing/utils/getSkewCorrectedDate.js");var _getUpdatedSystemClockOffset=__webpack_require__(/*! ./utils/getUpdatedSystemClockOffset */ "../core/lib-esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var signingMiddleware=function signingMiddleware(_a){var credentials=_a.credentials,region=_a.region,service=_a.service,_b=_a.uriEscapePath,uriEscapePath=_b===void 0?true:_b;var currentSystemClockOffset;return function(next){return function signingMiddleware(request){return __awaiter(this,void 0,void 0,function(){var signRequestOptions,_a,signedRequest,response,dateString;var _b;return __generator(this,function(_c){switch(_c.label){case 0:currentSystemClockOffset=currentSystemClockOffset!==null&&currentSystemClockOffset!==void 0?currentSystemClockOffset:0;_b={};if(!(typeof credentials==='function'))return[3,2];return[4,credentials()];case 1:_a=_c.sent();return[3,3];case 2:_a=credentials;_c.label=3;case 3:signRequestOptions=(_b.credentials=_a,_b.signingDate=(0,_getSkewCorrectedDate.getSkewCorrectedDate)(currentSystemClockOffset),_b.signingRegion=region,_b.signingService=service,_b.uriEscapePath=uriEscapePath,_b);return[4,(0,_signatureV.signRequest)(request,signRequestOptions)];case 4:signedRequest=_c.sent();return[4,next(signedRequest)];case 5:response=_c.sent();dateString=getDateHeader(response);if(dateString){currentSystemClockOffset=(0,_getUpdatedSystemClockOffset.getUpdatedSystemClockOffset)(Date.parse(dateString),currentSystemClockOffset);}return[2,response];}});});};};};exports.signingMiddleware=signingMiddleware;var getDateHeader=function getDateHeader(_a){var _b,_c;var _d=_a===void 0?{}:_a,headers=_d.headers;return(_c=(_b=headers===null||headers===void 0?void 0:headers.date)!==null&&_b!==void 0?_b:headers===null||headers===void 0?void 0:headers.Date)!==null&&_c!==void 0?_c:headers===null||headers===void 0?void 0:headers['x-amz-date'];};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js":
/*!**********************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.UNSIGNED_PAYLOAD=exports.TOKEN_QUERY_PARAM=exports.TOKEN_HEADER=exports.SIGNED_HEADERS_QUERY_PARAM=exports.SIGNATURE_QUERY_PARAM=exports.SIGNATURE_IDENTIFIER=exports.SHA256_ALGORITHM_IDENTIFIER=exports.REGION_SET_PARAM=exports.KEY_TYPE_IDENTIFIER=exports.HOST_HEADER=exports.EXPIRES_QUERY_PARAM=exports.EMPTY_HASH=exports.CREDENTIAL_QUERY_PARAM=exports.AUTH_HEADER=exports.AMZ_DATE_QUERY_PARAM=exports.AMZ_DATE_HEADER=exports.ALGORITHM_QUERY_PARAM=void 0;var ALGORITHM_QUERY_PARAM='X-Amz-Algorithm';exports.ALGORITHM_QUERY_PARAM=ALGORITHM_QUERY_PARAM;var AMZ_DATE_QUERY_PARAM='X-Amz-Date';exports.AMZ_DATE_QUERY_PARAM=AMZ_DATE_QUERY_PARAM;var CREDENTIAL_QUERY_PARAM='X-Amz-Credential';exports.CREDENTIAL_QUERY_PARAM=CREDENTIAL_QUERY_PARAM;var EXPIRES_QUERY_PARAM='X-Amz-Expires';exports.EXPIRES_QUERY_PARAM=EXPIRES_QUERY_PARAM;var REGION_SET_PARAM='X-Amz-Region-Set';exports.REGION_SET_PARAM=REGION_SET_PARAM;var SIGNATURE_QUERY_PARAM='X-Amz-Signature';exports.SIGNATURE_QUERY_PARAM=SIGNATURE_QUERY_PARAM;var SIGNED_HEADERS_QUERY_PARAM='X-Amz-SignedHeaders';exports.SIGNED_HEADERS_QUERY_PARAM=SIGNED_HEADERS_QUERY_PARAM;var TOKEN_QUERY_PARAM='X-Amz-Security-Token';exports.TOKEN_QUERY_PARAM=TOKEN_QUERY_PARAM;var AUTH_HEADER='authorization';exports.AUTH_HEADER=AUTH_HEADER;var HOST_HEADER='host';exports.HOST_HEADER=HOST_HEADER;var AMZ_DATE_HEADER=AMZ_DATE_QUERY_PARAM.toLowerCase();exports.AMZ_DATE_HEADER=AMZ_DATE_HEADER;var TOKEN_HEADER=TOKEN_QUERY_PARAM.toLowerCase();exports.TOKEN_HEADER=TOKEN_HEADER;var KEY_TYPE_IDENTIFIER='aws4_request';exports.KEY_TYPE_IDENTIFIER=KEY_TYPE_IDENTIFIER;var SHA256_ALGORITHM_IDENTIFIER='AWS4-HMAC-SHA256';exports.SHA256_ALGORITHM_IDENTIFIER=SHA256_ALGORITHM_IDENTIFIER;var SIGNATURE_IDENTIFIER='AWS4';exports.SIGNATURE_IDENTIFIER=SIGNATURE_IDENTIFIER;var EMPTY_HASH='e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';exports.EMPTY_HASH=EMPTY_HASH;var UNSIGNED_PAYLOAD='UNSIGNED-PAYLOAD';exports.UNSIGNED_PAYLOAD=UNSIGNED_PAYLOAD;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/index.js":
/*!******************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "TOKEN_QUERY_PARAM", ({enumerable:true,get:function get(){return _constants.TOKEN_QUERY_PARAM;}}));Object.defineProperty(exports, "getHashedPayload", ({enumerable:true,get:function get(){return _getHashedPayload.getHashedPayload;}}));Object.defineProperty(exports, "presignUrl", ({enumerable:true,get:function get(){return _presignUrl.presignUrl;}}));Object.defineProperty(exports, "signRequest", ({enumerable:true,get:function get(){return _signRequest.signRequest;}}));var _signRequest=__webpack_require__(/*! ./signRequest */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/signRequest.js");var _presignUrl=__webpack_require__(/*! ./presignUrl */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/presignUrl.js");var _constants=__webpack_require__(/*! ./constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var _getHashedPayload=__webpack_require__(/*! ./utils/getHashedPayload */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.js");

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/presignUrl.js":
/*!***********************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/presignUrl.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.presignUrl=void 0;var _constants=__webpack_require__(/*! ./constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var _getSigningValues=__webpack_require__(/*! ./utils/getSigningValues */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.js");var _getSignature=__webpack_require__(/*! ./utils/getSignature */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.js");var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==="function")for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;};var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var presignUrl=function presignUrl(_a,_b){var _c,_d,_e,_f;var body=_a.body,_g=_a.method,method=_g===void 0?'GET':_g,url=_a.url;var expiration=_b.expiration,options=__rest(_b,["expiration"]);var signingValues=(0,_getSigningValues.getSigningValues)(options);var accessKeyId=signingValues.accessKeyId,credentialScope=signingValues.credentialScope,longDate=signingValues.longDate,sessionToken=signingValues.sessionToken;var presignedUrl=new URL(url);Object.entries(__assign(__assign((_c={},_c[_constants.ALGORITHM_QUERY_PARAM]=_constants.SHA256_ALGORITHM_IDENTIFIER,_c[_constants.CREDENTIAL_QUERY_PARAM]="".concat(accessKeyId,"/").concat(credentialScope),_c[_constants.AMZ_DATE_QUERY_PARAM]=longDate,_c[_constants.SIGNED_HEADERS_QUERY_PARAM]=_constants.HOST_HEADER,_c),expiration&&(_d={},_d[_constants.EXPIRES_QUERY_PARAM]=expiration.toString(),_d)),sessionToken&&(_e={},_e[_constants.TOKEN_QUERY_PARAM]=sessionToken,_e))).forEach(function(_a){var _b=__read(_a,2),key=_b[0],value=_b[1];presignedUrl.searchParams.append(key,value);});var requestToSign={body:body,headers:(_f={},_f[_constants.HOST_HEADER]=url.host,_f),method:method,url:presignedUrl};var signature=(0,_getSignature.getSignature)(requestToSign,signingValues);presignedUrl.searchParams.append(_constants.SIGNATURE_QUERY_PARAM,signature);return presignedUrl;};exports.presignUrl=presignUrl;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/signRequest.js":
/*!************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/signRequest.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.signRequest=void 0;var _getSignedHeaders=__webpack_require__(/*! ./utils/getSignedHeaders */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.js");var _getSigningValues=__webpack_require__(/*! ./utils/getSigningValues */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.js");var _constants=__webpack_require__(/*! ./constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var _getSignature=__webpack_require__(/*! ./utils/getSignature */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.js");var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var signRequest=function signRequest(request,options){var signingValues=(0,_getSigningValues.getSigningValues)(options);var accessKeyId=signingValues.accessKeyId,credentialScope=signingValues.credentialScope,longDate=signingValues.longDate,sessionToken=signingValues.sessionToken;var headers=__assign({},request.headers);headers[_constants.HOST_HEADER]=request.url.host;headers[_constants.AMZ_DATE_HEADER]=longDate;if(sessionToken){headers[_constants.TOKEN_HEADER]=sessionToken;}var requestToSign=__assign(__assign({},request),{headers:headers});var signature=(0,_getSignature.getSignature)(requestToSign,signingValues);var credentialEntry="Credential=".concat(accessKeyId,"/").concat(credentialScope);var signedHeadersEntry="SignedHeaders=".concat((0,_getSignedHeaders.getSignedHeaders)(headers));var signatureEntry="Signature=".concat(signature);headers[_constants.AUTH_HEADER]="".concat(_constants.SHA256_ALGORITHM_IDENTIFIER," ").concat(credentialEntry,", ").concat(signedHeadersEntry,", ").concat(signatureEntry);return requestToSign;};exports.signRequest=signRequest;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.js":
/*!**********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getHashedDataAsHex=exports.getHashedData=void 0;var _sha256Js=__webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/index.js");var _utilHexEncoding=__webpack_require__(/*! @aws-sdk/util-hex-encoding */ "../../node_modules/@aws-sdk/util-hex-encoding/dist/es/index.js");var getHashedData=function getHashedData(key,data){var sha256=new _sha256Js.Sha256(key);sha256.update(data);var hashedData=sha256.digestSync();return hashedData;};exports.getHashedData=getHashedData;var getHashedDataAsHex=function getHashedDataAsHex(key,data){var hashedData=getHashedData(key,data);return(0,_utilHexEncoding.toHex)(hashedData);};exports.getHashedDataAsHex=getHashedDataAsHex;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.js":
/*!**************************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getCanonicalHeaders=void 0;var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var getCanonicalHeaders=function getCanonicalHeaders(headers){return Object.entries(headers).map(function(_a){var _b;var _c=__read(_a,2),key=_c[0],value=_c[1];return{key:key.toLowerCase(),value:(_b=value===null||value===void 0?void 0:value.trim().replace(/\s+/g,' '))!==null&&_b!==void 0?_b:''};}).sort(function(a,b){return a.key<b.key?-1:1;}).map(function(entry){return"".concat(entry.key,":").concat(entry.value,"\n");}).join('');};exports.getCanonicalHeaders=getCanonicalHeaders;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.js":
/*!******************************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getCanonicalQueryString=void 0;var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var getCanonicalQueryString=function getCanonicalQueryString(searchParams){return Array.from(searchParams).sort(function(_a,_b){var _c=__read(_a,2),keyA=_c[0],valA=_c[1];var _d=__read(_b,2),keyB=_d[0],valB=_d[1];if(keyA===keyB){return valA<valB?-1:1;}return keyA<keyB?-1:1;}).map(function(_a){var _b=__read(_a,2),key=_b[0],val=_b[1];return"".concat(escapeUri(key),"=").concat(escapeUri(val));}).join('&');};exports.getCanonicalQueryString=getCanonicalQueryString;var escapeUri=function escapeUri(uri){return encodeURIComponent(uri).replace(/[!'()*]/g,hexEncode);};var hexEncode=function hexEncode(c){return"%".concat(c.charCodeAt(0).toString(16).toUpperCase());};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.js":
/*!**************************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getCanonicalRequest=void 0;var _getCanonicalHeaders=__webpack_require__(/*! ./getCanonicalHeaders */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.js");var _getCanonicalQueryString=__webpack_require__(/*! ./getCanonicalQueryString */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.js");var _getCanonicalUri=__webpack_require__(/*! ./getCanonicalUri */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.js");var _getHashedPayload=__webpack_require__(/*! ./getHashedPayload */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.js");var _getSignedHeaders=__webpack_require__(/*! ./getSignedHeaders */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.js");var getCanonicalRequest=function getCanonicalRequest(_a,uriEscapePath){var body=_a.body,headers=_a.headers,method=_a.method,url=_a.url;if(uriEscapePath===void 0){uriEscapePath=true;}return[method,(0,_getCanonicalUri.getCanonicalUri)(url.pathname,uriEscapePath),(0,_getCanonicalQueryString.getCanonicalQueryString)(url.searchParams),(0,_getCanonicalHeaders.getCanonicalHeaders)(headers),(0,_getSignedHeaders.getSignedHeaders)(headers),(0,_getHashedPayload.getHashedPayload)(body)].join('\n');};exports.getCanonicalRequest=getCanonicalRequest;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.js":
/*!**********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getCanonicalUri=void 0;var getCanonicalUri=function getCanonicalUri(pathname,uriEscapePath){if(uriEscapePath===void 0){uriEscapePath=true;}return pathname?uriEscapePath?encodeURIComponent(pathname).replace(/%2F/g,'/'):pathname:'/';};exports.getCanonicalUri=getCanonicalUri;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.js":
/*!*************************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getCredentialScope=void 0;var _constants=__webpack_require__(/*! ../constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var getCredentialScope=function getCredentialScope(date,region,service){return"".concat(date,"/").concat(region,"/").concat(service,"/").concat(_constants.KEY_TYPE_IDENTIFIER);};exports.getCredentialScope=getCredentialScope;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.js":
/*!************************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getFormattedDates=void 0;var getFormattedDates=function getFormattedDates(date){var longDate=date.toISOString().replace(/[:\-]|\.\d{3}/g,'');return{longDate:longDate,shortDate:longDate.slice(0,8)};};exports.getFormattedDates=getFormattedDates;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.js":
/*!***********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getHashedPayload=void 0;var _constants=__webpack_require__(/*! ../constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var _dataHashHelpers=__webpack_require__(/*! ./dataHashHelpers */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.js");var getHashedPayload=function getHashedPayload(body){if(body==null){return _constants.EMPTY_HASH;}if(isSourceData(body)){var hashedData=(0,_dataHashHelpers.getHashedDataAsHex)(null,body);return hashedData;}return _constants.UNSIGNED_PAYLOAD;};exports.getHashedPayload=getHashedPayload;var isSourceData=function isSourceData(body){return typeof body==='string'||ArrayBuffer.isView(body)||isArrayBuffer(body);};var isArrayBuffer=function isArrayBuffer(arg){return typeof ArrayBuffer==='function'&&arg instanceof ArrayBuffer||Object.prototype.toString.call(arg)==='[object ArrayBuffer]';};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.js":
/*!*******************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSignature=void 0;var _dataHashHelpers=__webpack_require__(/*! ./dataHashHelpers */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.js");var _getCanonicalRequest=__webpack_require__(/*! ./getCanonicalRequest */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.js");var _getSigningKey=__webpack_require__(/*! ./getSigningKey */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.js");var _getStringToSign=__webpack_require__(/*! ./getStringToSign */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.js");var getSignature=function getSignature(request,_a){var credentialScope=_a.credentialScope,longDate=_a.longDate,secretAccessKey=_a.secretAccessKey,shortDate=_a.shortDate,signingRegion=_a.signingRegion,signingService=_a.signingService,uriEscapePath=_a.uriEscapePath;var canonicalRequest=(0,_getCanonicalRequest.getCanonicalRequest)(request,uriEscapePath);var hashedRequest=(0,_dataHashHelpers.getHashedDataAsHex)(null,canonicalRequest);var stringToSign=(0,_getStringToSign.getStringToSign)(longDate,credentialScope,hashedRequest);var signature=(0,_dataHashHelpers.getHashedDataAsHex)((0,_getSigningKey.getSigningKey)(secretAccessKey,shortDate,signingRegion,signingService),stringToSign);return signature;};exports.getSignature=getSignature;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.js":
/*!***********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSignedHeaders=void 0;var getSignedHeaders=function getSignedHeaders(headers){return Object.keys(headers).map(function(key){return key.toLowerCase();}).sort().join(';');};exports.getSignedHeaders=getSignedHeaders;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.js":
/*!********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSigningKey=void 0;var _constants=__webpack_require__(/*! ../constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var _dataHashHelpers=__webpack_require__(/*! ./dataHashHelpers */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.js");var getSigningKey=function getSigningKey(secretAccessKey,date,region,service){var key="".concat(_constants.SIGNATURE_IDENTIFIER).concat(secretAccessKey);var dateKey=(0,_dataHashHelpers.getHashedData)(key,date);var regionKey=(0,_dataHashHelpers.getHashedData)(dateKey,region);var serviceKey=(0,_dataHashHelpers.getHashedData)(regionKey,service);var signingKey=(0,_dataHashHelpers.getHashedData)(serviceKey,_constants.KEY_TYPE_IDENTIFIER);return signingKey;};exports.getSigningKey=getSigningKey;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.js":
/*!***********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSigningValues=void 0;var _getCredentialScope=__webpack_require__(/*! ./getCredentialScope */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.js");var _getFormattedDates=__webpack_require__(/*! ./getFormattedDates */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.js");var getSigningValues=function getSigningValues(_a){var credentials=_a.credentials,_b=_a.signingDate,signingDate=_b===void 0?new Date():_b,signingRegion=_a.signingRegion,signingService=_a.signingService,_c=_a.uriEscapePath,uriEscapePath=_c===void 0?true:_c;var accessKeyId=credentials.accessKeyId,secretAccessKey=credentials.secretAccessKey,sessionToken=credentials.sessionToken;var _d=(0,_getFormattedDates.getFormattedDates)(signingDate),longDate=_d.longDate,shortDate=_d.shortDate;var credentialScope=(0,_getCredentialScope.getCredentialScope)(shortDate,signingRegion,signingService);return{accessKeyId:accessKeyId,credentialScope:credentialScope,longDate:longDate,secretAccessKey:secretAccessKey,sessionToken:sessionToken,shortDate:shortDate,signingRegion:signingRegion,signingService:signingService,uriEscapePath:uriEscapePath};};exports.getSigningValues=getSigningValues;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.js":
/*!**********************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getStringToSign=void 0;var _constants=__webpack_require__(/*! ../constants */ "../core/lib-esm/clients/middleware/signing/signer/signatureV4/constants.js");var getStringToSign=function getStringToSign(date,credentialScope,hashedRequest){return[_constants.SHA256_ALGORITHM_IDENTIFIER,date,credentialScope,hashedRequest].join('\n');};exports.getStringToSign=getStringToSign;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/utils/extendedEncodeURIComponent.js":
/*!**************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/utils/extendedEncodeURIComponent.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.extendedEncodeURIComponent=void 0;var extendedEncodeURIComponent=function extendedEncodeURIComponent(uri){var extendedCharacters=/[!'()*]/g;return encodeURIComponent(uri).replace(extendedCharacters,hexEncode);};exports.extendedEncodeURIComponent=extendedEncodeURIComponent;var hexEncode=function hexEncode(c){return"%".concat(c.charCodeAt(0).toString(16).toUpperCase());};

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/utils/getSkewCorrectedDate.js":
/*!********************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/utils/getSkewCorrectedDate.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSkewCorrectedDate=void 0;var getSkewCorrectedDate=function getSkewCorrectedDate(systemClockOffset){return new Date(Date.now()+systemClockOffset);};exports.getSkewCorrectedDate=getSkewCorrectedDate;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.js":
/*!***************************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.getUpdatedSystemClockOffset=void 0;var _isClockSkewed=__webpack_require__(/*! ./isClockSkewed */ "../core/lib-esm/clients/middleware/signing/utils/isClockSkewed.js");var getUpdatedSystemClockOffset=function getUpdatedSystemClockOffset(clockTimeInMilliseconds,currentSystemClockOffset){if((0,_isClockSkewed.isClockSkewed)(clockTimeInMilliseconds,currentSystemClockOffset)){return clockTimeInMilliseconds-Date.now();}return currentSystemClockOffset;};exports.getUpdatedSystemClockOffset=getUpdatedSystemClockOffset;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/signing/utils/isClockSkewed.js":
/*!*************************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/signing/utils/isClockSkewed.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.isClockSkewed=void 0;var _getSkewCorrectedDate=__webpack_require__(/*! ./getSkewCorrectedDate */ "../core/lib-esm/clients/middleware/signing/utils/getSkewCorrectedDate.js");var SKEW_WINDOW=5*60*1000;var isClockSkewed=function isClockSkewed(clockTimeInMilliseconds,clockOffsetInMilliseconds){return Math.abs((0,_getSkewCorrectedDate.getSkewCorrectedDate)(clockOffsetInMilliseconds).getTime()-clockTimeInMilliseconds)>=SKEW_WINDOW;};exports.isClockSkewed=isClockSkewed;

/***/ }),

/***/ "../core/lib-esm/clients/middleware/userAgent/index.js":
/*!*************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/userAgent/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "userAgentMiddleware", ({enumerable:true,get:function get(){return _middleware.userAgentMiddleware;}}));var _middleware=__webpack_require__(/*! ./middleware */ "../core/lib-esm/clients/middleware/userAgent/middleware.js");

/***/ }),

/***/ "../core/lib-esm/clients/middleware/userAgent/middleware.js":
/*!******************************************************************!*\
  !*** ../core/lib-esm/clients/middleware/userAgent/middleware.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports) {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.userAgentMiddleware=void 0;var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var userAgentMiddleware=function userAgentMiddleware(_a){var _b=_a.userAgentHeader,userAgentHeader=_b===void 0?'x-amz-user-agent':_b,_c=_a.userAgentValue,userAgentValue=_c===void 0?'':_c;return function(next){return function userAgentMiddleware(request){return __awaiter(this,void 0,void 0,function(){var result,headerName,response;return __generator(this,function(_a){switch(_a.label){case 0:if(!(userAgentValue.trim().length===0))return[3,2];return[4,next(request)];case 1:result=_a.sent();return[2,result];case 2:headerName=userAgentHeader.toLowerCase();request.headers[headerName]=request.headers[headerName]?"".concat(request.headers[headerName]," ").concat(userAgentValue):userAgentValue;return[4,next(request)];case 3:response=_a.sent();return[2,response];}});});};};};exports.userAgentMiddleware=userAgentMiddleware;

/***/ }),

/***/ "../core/lib-esm/clients/serde/index.js":
/*!**********************************************!*\
  !*** ../core/lib-esm/clients/serde/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "parseJsonBody", ({enumerable:true,get:function get(){return _json.parseJsonBody;}}));Object.defineProperty(exports, "parseJsonError", ({enumerable:true,get:function get(){return _json.parseJsonError;}}));Object.defineProperty(exports, "parseMetadata", ({enumerable:true,get:function get(){return _responseInfo.parseMetadata;}}));var _responseInfo=__webpack_require__(/*! ./responseInfo */ "../core/lib-esm/clients/serde/responseInfo.js");var _json=__webpack_require__(/*! ./json */ "../core/lib-esm/clients/serde/json.js");

/***/ }),

/***/ "../core/lib-esm/clients/serde/json.js":
/*!*********************************************!*\
  !*** ../core/lib-esm/clients/serde/json.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.parseJsonError=exports.parseJsonBody=void 0;var _extends2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js"));var _responseInfo=__webpack_require__(/*! ./responseInfo */ "../core/lib-esm/clients/serde/responseInfo.js");var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var __read=this&&this.__read||function(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;};var parseJsonError=function parseJsonError(response){return __awaiter(void 0,void 0,void 0,function(){var body,sanitizeErrorCode,code,message,error;var _a,_b,_c,_d,_e;return __generator(this,function(_f){switch(_f.label){case 0:if(!response||response.statusCode<300){return[2];}return[4,parseJsonBody(response)];case 1:body=_f.sent();sanitizeErrorCode=function sanitizeErrorCode(rawValue){var _a=__read(rawValue.toString().split(/[\,\:]+/),1),cleanValue=_a[0];if(cleanValue.includes('#')){return cleanValue.split('#')[1];}return cleanValue;};code=sanitizeErrorCode((_c=(_b=(_a=response.headers['x-amzn-errortype'])!==null&&_a!==void 0?_a:body.code)!==null&&_b!==void 0?_b:body.__type)!==null&&_c!==void 0?_c:'UnknownError');message=(_e=(_d=body.message)!==null&&_d!==void 0?_d:body.Message)!==null&&_e!==void 0?_e:'Unknown error';error=new Error(message);return[2,(0,_extends2["default"])(error,{name:code,$metadata:(0,_responseInfo.parseMetadata)(response)})];}});});};exports.parseJsonError=parseJsonError;var parseJsonBody=function parseJsonBody(response){return __awaiter(void 0,void 0,void 0,function(){var output;return __generator(this,function(_a){switch(_a.label){case 0:if(!response.body){throw new Error('Missing response payload');}return[4,response.body.json()];case 1:output=_a.sent();return[2,(0,_extends2["default"])(output,{$metadata:(0,_responseInfo.parseMetadata)(response)})];}});});};exports.parseJsonBody=parseJsonBody;

/***/ }),

/***/ "../core/lib-esm/clients/serde/responseInfo.js":
/*!*****************************************************!*\
  !*** ../core/lib-esm/clients/serde/responseInfo.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.parseMetadata=void 0;var _typeof2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js"));var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};var parseMetadata=function parseMetadata(response){var _a,_b;var headers=response.headers,statusCode=response.statusCode;return __assign(__assign({},isMetadataBearer(response)?response.$metadata:{}),{httpStatusCode:statusCode,requestId:(_b=(_a=headers['x-amzn-requestid'])!==null&&_a!==void 0?_a:headers['x-amzn-request-id'])!==null&&_b!==void 0?_b:headers['x-amz-request-id'],extendedRequestId:headers['x-amz-id-2'],cfId:headers['x-amz-cf-id']});};exports.parseMetadata=parseMetadata;var isMetadataBearer=function isMetadataBearer(response){return(0,_typeof2["default"])(response===null||response===void 0?void 0:response['$metadata'])==='object';};

/***/ }),

/***/ "../core/lib-esm/clients/utils/memoization.js":
/*!****************************************************!*\
  !*** ../core/lib-esm/clients/utils/memoization.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.withMemoization=void 0;var withMemoization=function withMemoization(payloadAccessor){var cached;return function(){if(!cached){cached=payloadAccessor();}return cached;};};exports.withMemoization=withMemoization;

/***/ }),

/***/ "./lib-esm/InAppMessaging/InAppMessaging.js":
/*!**************************************************!*\
  !*** ./lib-esm/InAppMessaging/InAppMessaging.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _core=__webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");var _flatten=_interopRequireDefault(__webpack_require__(/*! lodash/flatten */ "../../node_modules/lodash/flatten.js"));var _common=__webpack_require__(/*! ../common */ "./lib-esm/common/index.js");var _Providers=__webpack_require__(/*! ./Providers */ "./lib-esm/InAppMessaging/Providers/index.js");var _types=__webpack_require__(/*! ./types */ "./lib-esm/InAppMessaging/types.js");var STORAGE_KEY_SUFFIX='_inAppMessages';var logger=new _core.ConsoleLogger('Notifications.InAppMessaging');var InAppMessaging=function(){function InAppMessaging(){var _this=this;this.config={};this.listeningForAnalyticEvents=false;this.pluggables=[];this.storageSynced=false;this.configure=function(_a){if(_a===void 0){_a={};}var _b=_a.listenForAnalyticsEvents,listenForAnalyticsEvents=_b===void 0?true:_b,config=(0,_tslib.__rest)(_a,["listenForAnalyticsEvents"]);_this.config=(0,_tslib.__assign)((0,_tslib.__assign)({},_this.config),config);logger.debug('configure InAppMessaging',_this.config);_this.pluggables.forEach(function(pluggable){pluggable.configure(_this.config[pluggable.getProviderName()]);});if(_this.pluggables.length===0){_this.addPluggable(new _Providers.AWSPinpointProvider());}if(listenForAnalyticsEvents&&!_this.listeningForAnalyticEvents){_core.Hub.listen('analytics',_this.analyticsListener);_this.listeningForAnalyticEvents=true;}return _this.config;};this.getPluggable=function(providerName){var _a;var pluggable=(_a=_this.pluggables.find(function(pluggable){return pluggable.getProviderName()===providerName;}))!==null&&_a!==void 0?_a:null;if(!pluggable){logger.debug("No plugin found with name "+providerName);}return pluggable;};this.addPluggable=function(pluggable){if(pluggable&&pluggable.getCategory()==='Notifications'&&pluggable.getSubCategory()==='InAppMessaging'){if(_this.getPluggable(pluggable.getProviderName())){throw new Error("Pluggable "+pluggable.getProviderName()+" has already been added.");}_this.pluggables.push(pluggable);pluggable.configure(_this.config[pluggable.getProviderName()]);}};this.removePluggable=function(providerName){var index=_this.pluggables.findIndex(function(pluggable){return pluggable.getProviderName()===providerName;});if(index===-1){logger.debug("No plugin found with name "+providerName);}else{_this.pluggables.splice(index,1);}};this.syncMessages=function(){return Promise.all(_this.pluggables.map(function(pluggable){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var messages,key,err_1;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,3,,4]);return[4,pluggable.getInAppMessages()];case 1:messages=_a.sent();key=""+pluggable.getProviderName()+STORAGE_KEY_SUFFIX;return[4,this.setMessages(key,messages)];case 2:_a.sent();return[3,4];case 3:err_1=_a.sent();logger.error('Failed to sync messages',err_1);throw err_1;case 4:return[2];}});});}));};this.clearMessages=function(){return Promise.all(_this.pluggables.map(function(pluggable){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var key;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:key=""+pluggable.getProviderName()+STORAGE_KEY_SUFFIX;return[4,this.removeMessages(key)];case 1:_a.sent();return[2];}});});}));};this.dispatchEvent=function(event){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var messages,flattenedMessages;var _this=this;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:return[4,Promise.all(this.pluggables.map(function(pluggable){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var key,messages;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:key=""+pluggable.getProviderName()+STORAGE_KEY_SUFFIX;return[4,this.getMessages(key)];case 1:messages=_a.sent();return[2,pluggable.processInAppMessages(messages,event)];}});});}))];case 1:messages=_a.sent();flattenedMessages=(0,_flatten["default"])(messages);if(flattenedMessages.length){(0,_common.notifyEventListeners)(_types.InAppMessageInteractionEvent.MESSAGE_RECEIVED,this.conflictHandler(flattenedMessages));}return[2];}});});};this.identifyUser=function(userId,userInfo){return Promise.all(_this.pluggables.map(function(pluggable){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var err_2;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,2,,3]);return[4,pluggable.identifyUser(userId,userInfo)];case 1:_a.sent();return[3,3];case 2:err_2=_a.sent();logger.error('Failed to identify user',err_2);throw err_2;case 3:return[2];}});});}));};this.onMessageReceived=function(handler){return(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_RECEIVED,handler);};this.onMessageDisplayed=function(handler){return(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_DISPLAYED,handler);};this.onMessageDismissed=function(handler){return(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_DISMISSED,handler);};this.onMessageActionTaken=function(handler){return(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN,handler);};this.notifyMessageInteraction=function(message,type){(0,_common.notifyEventListeners)(type,message);};this.setConflictHandler=function(handler){_this.conflictHandler=handler;};this.analyticsListener=function(_a){var payload=_a.payload;var event=payload.event,data=payload.data;switch(event){case'record':{_this.dispatchEvent(data);break;}default:break;}};this.syncStorage=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var storage,err_3;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:storage=this.config.storage;_a.label=1;case 1:_a.trys.push([1,4,,5]);if(!(typeof storage.sync==='function'))return[3,3];return[4,storage.sync()];case 2:_a.sent();_a.label=3;case 3:this.storageSynced=true;return[3,5];case 4:err_3=_a.sent();logger.error('Failed to sync storage',err_3);return[3,5];case 5:return[2];}});});};this.getMessages=function(key){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var storage,storedMessages,err_4;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,3,,4]);if(!!this.storageSynced)return[3,2];return[4,this.syncStorage()];case 1:_a.sent();_a.label=2;case 2:storage=this.config.storage;storedMessages=storage.getItem(key);return[2,storedMessages?JSON.parse(storedMessages):[]];case 3:err_4=_a.sent();logger.error('Failed to retrieve in-app messages from storage',err_4);return[3,4];case 4:return[2];}});});};this.setMessages=function(key,messages){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var storage,err_5;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:if(!messages){return[2];}_a.label=1;case 1:_a.trys.push([1,4,,5]);if(!!this.storageSynced)return[3,3];return[4,this.syncStorage()];case 2:_a.sent();_a.label=3;case 3:storage=this.config.storage;storage.setItem(key,JSON.stringify(messages));return[3,5];case 4:err_5=_a.sent();logger.error('Failed to store in-app messages',err_5);return[3,5];case 5:return[2];}});});};this.removeMessages=function(key){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var storage,err_6;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,3,,4]);if(!!this.storageSynced)return[3,2];return[4,this.syncStorage()];case 1:_a.sent();_a.label=2;case 2:storage=this.config.storage;storage.removeItem(key);return[3,4];case 3:err_6=_a.sent();logger.error('Failed to remove in-app messages from storage',err_6);return[3,4];case 4:return[2];}});});};this.defaultConflictHandler=function(messages){var sorted=messages.sort(function(a,b){var _a,_b;var endDateA=(_a=a.metadata)===null||_a===void 0?void 0:_a.endDate;var endDateB=(_b=b.metadata)===null||_b===void 0?void 0:_b.endDate;if(endDateA===endDateB){return 0;}if(endDateA&&!endDateB){return-1;}if(!endDateA&&endDateB){return 1;}return new Date(endDateA)<new Date(endDateB)?-1:1;});return sorted[0];};this.config={storage:new _core.StorageHelper().getStorage()};this.setConflictHandler(this.defaultConflictHandler);}InAppMessaging.prototype.getModuleName=function(){return'InAppMessaging';};return InAppMessaging;}();var _default=InAppMessaging;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/index.js":
/*!***********************************************************************!*\
  !*** ./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _pinpoint=__webpack_require__(/*! @aws-amplify/core/internals/aws-clients/pinpoint */ "../core/lib-esm/AwsClients/Pinpoint/index.js");var _common=__webpack_require__(/*! ../../../common */ "./lib-esm/common/index.js");var _SessionTracker=_interopRequireDefault(__webpack_require__(/*! ../../SessionTracker */ "./lib-esm/InAppMessaging/SessionTracker/index.js"));var _types=__webpack_require__(/*! ../../types */ "./lib-esm/InAppMessaging/types.js");var _types2=__webpack_require__(/*! ./types */ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/types.js");var _utils=__webpack_require__(/*! ./utils */ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/utils.js");var MESSAGE_DAILY_COUNT_KEY='pinpointProvider_inAppMessages_dailyCount';var MESSAGE_TOTAL_COUNT_KEY='pinpointProvider_inAppMessages_totalCount';var AWSPinpointProvider=function(_super){(0,_tslib.__extends)(AWSPinpointProvider,_super);function AWSPinpointProvider(){var _this=_super.call(this,_utils.logger)||this;_this.configured=false;_this.configure=function(config){if(config===void 0){config={};}_this.config=(0,_tslib.__assign)((0,_tslib.__assign)({},_super.prototype.configure.call(_this,config)),{endpointInfo:{channelType:'IN_APP'}});if(!_this.configured){_this.sessionTracker=new _SessionTracker["default"](_this.sessionStateChangeHandler);_this.sessionTracker.start();(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_DISPLAYED,function(message){_this.recordMessageEvent(message,_types2.AWSPinpointMessageEvent.MESSAGE_DISPLAYED);});(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_DISMISSED,function(message){_this.recordMessageEvent(message,_types2.AWSPinpointMessageEvent.MESSAGE_DISMISSED);});(0,_common.addEventListener)(_types.InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN,function(message){_this.recordMessageEvent(message,_types2.AWSPinpointMessageEvent.MESSAGE_ACTION_TAKEN);});}_this.configured=true;(0,_utils.dispatchInAppMessagingEvent)('pinpointProvider_configured',null);return _this.config;};_this.getInAppMessages=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var _a,appId,credentials,endpointId,region,input,response,messages,err_1;return(0,_tslib.__generator)(this,function(_b){switch(_b.label){case 0:if(!!this.initialized)return[3,2];return[4,this.init()];case 1:_b.sent();_b.label=2;case 2:(0,_utils.clearMemo)();_b.label=3;case 3:_b.trys.push([3,6,,7]);return[4,this.updateEndpoint()];case 4:_b.sent();_a=this.config,appId=_a.appId,credentials=_a.credentials,endpointId=_a.endpointId,region=_a.region;input={ApplicationId:appId,EndpointId:endpointId};this.logger.debug('getting in-app messages');return[4,(0,_pinpoint.getInAppMessages)({credentials:credentials,region:region},input)];case 5:response=_b.sent();messages=response.InAppMessagesResponse.InAppMessageCampaigns;(0,_utils.dispatchInAppMessagingEvent)('getInAppMessages',messages);return[2,messages];case 6:err_1=_b.sent();this.logger.error('Error getting in-app messages',err_1);throw err_1;case 7:return[2];}});});};_this.processInAppMessages=function(messages,event){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var highestPrioritySeen;var _this=this;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:if(!!this.initialized)return[3,2];return[4,this.init()];case 1:_a.sent();_a.label=2;case 2:return[2,this.normalizeMessages(messages.reduce(function(acc,message){var messageQualifies=(0,_utils.matchesEventType)(message,event)&&(0,_utils.matchesAttributes)(message,event)&&(0,_utils.matchesMetrics)(message,event)&&(0,_utils.isBeforeEndDate)(message)&&_this.isBelowCap(message);if(messageQualifies){if(!highestPrioritySeen){if(message.Priority){highestPrioritySeen=message.Priority;return[message];}else{acc.push(message);}}else if(message.Priority){if(message.Priority<highestPrioritySeen){highestPrioritySeen=message.Priority;return[message];}else if(message.Priority===highestPrioritySeen){acc.push(message);}}}return acc;},[]))];}});});};_this.sessionStateChangeHandler=function(state){if(state==='started'){_this.sessionMessageCountMap={};}};_this.isBelowCap=function(_a){var CampaignId=_a.CampaignId,SessionCap=_a.SessionCap,DailyCap=_a.DailyCap,TotalCap=_a.TotalCap;var _b=_this.getMessageCounts(CampaignId),sessionCount=_b.sessionCount,dailyCount=_b.dailyCount,totalCount=_b.totalCount;return(!SessionCap||sessionCount<SessionCap)&&(!DailyCap||dailyCount<DailyCap)&&(!TotalCap||totalCount<TotalCap);};_this.getSessionCount=function(messageId){return _this.sessionMessageCountMap[messageId]||0;};_this.getDailyCount=function(){var storage=_this.config.storage;var today=(0,_utils.getStartOfDay)();var item=storage.getItem(MESSAGE_DAILY_COUNT_KEY);var counter=item?JSON.parse(item):{count:0,lastCountTimestamp:today};return counter.lastCountTimestamp===today?counter.count:0;};_this.getTotalCountMap=function(){var storage=_this.config.storage;var item=storage.getItem(MESSAGE_TOTAL_COUNT_KEY);return item?JSON.parse(item):{};};_this.getTotalCount=function(messageId){var countMap=_this.getTotalCountMap();return countMap[messageId]||0;};_this.getMessageCounts=function(messageId){try{return{sessionCount:_this.getSessionCount(messageId),dailyCount:_this.getDailyCount(),totalCount:_this.getTotalCount(messageId)};}catch(err){_this.logger.error('Failed to get message counts from storage',err);}};_this.setSessionCount=function(messageId,count){_this.sessionMessageCountMap[messageId]=count;};_this.setDailyCount=function(count){var storage=_this.config.storage;var dailyCount={count:count,lastCountTimestamp:(0,_utils.getStartOfDay)()};try{storage.setItem(MESSAGE_DAILY_COUNT_KEY,JSON.stringify(dailyCount));}catch(err){_this.logger.error('Failed to save daily message count to storage',err);}};_this.setTotalCountMap=function(countMap){var storage=_this.config.storage;try{storage.setItem(MESSAGE_TOTAL_COUNT_KEY,JSON.stringify(countMap));}catch(err){_this.logger.error('Failed to save total count to storage',err);}};_this.setTotalCount=function(messageId,count){var _a;var updatedMap=(0,_tslib.__assign)((0,_tslib.__assign)({},_this.getTotalCountMap()),(_a={},_a[messageId]=count,_a));_this.setTotalCountMap(updatedMap);};_this.incrementCounts=function(messageId){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var _a,sessionCount,dailyCount,totalCount;return(0,_tslib.__generator)(this,function(_b){_a=this.getMessageCounts(messageId),sessionCount=_a.sessionCount,dailyCount=_a.dailyCount,totalCount=_a.totalCount;this.setSessionCount(messageId,sessionCount+1);this.setDailyCount(dailyCount+1);this.setTotalCount(messageId,totalCount+1);return[2];});});};_this.normalizeMessages=function(messages){return messages.map(function(message){var CampaignId=message.CampaignId,InAppMessage=message.InAppMessage;return{id:CampaignId,content:(0,_utils.extractContent)(message),layout:(0,_utils.interpretLayout)(InAppMessage.Layout),metadata:(0,_utils.extractMetadata)(message)};});};_this.recordMessageEvent=function(message,event){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:if(!!this.initialized)return[3,2];return[4,this.init()];case 1:_a.sent();_a.label=2;case 2:(0,_utils.recordAnalyticsEvent)(event,message);if(!(event===_types2.AWSPinpointMessageEvent.MESSAGE_DISPLAYED))return[3,4];return[4,this.incrementCounts(message.id)];case 3:_a.sent();_a.label=4;case 4:return[2];}});});};_this.sessionMessageCountMap={};return _this;}AWSPinpointProvider.prototype.getSubCategory=function(){return AWSPinpointProvider.subCategory;};AWSPinpointProvider.subCategory='InAppMessaging';return AWSPinpointProvider;}(_common.AWSPinpointProviderCommon);var _default=AWSPinpointProvider;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/types.js":
/*!***********************************************************************!*\
  !*** ./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/types.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.AWSPinpointMessageEvent=void 0;var AWSPinpointMessageEvent;exports.AWSPinpointMessageEvent=AWSPinpointMessageEvent;(function(AWSPinpointMessageEvent){AWSPinpointMessageEvent["MESSAGE_DISPLAYED"]="_inapp.message_displayed";AWSPinpointMessageEvent["MESSAGE_DISMISSED"]="_inapp.message_dismissed";AWSPinpointMessageEvent["MESSAGE_ACTION_TAKEN"]="_inapp.message_clicked";})(AWSPinpointMessageEvent||(exports.AWSPinpointMessageEvent=AWSPinpointMessageEvent={}));

/***/ }),

/***/ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/utils.js":
/*!***********************************************************************!*\
  !*** ./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/utils.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports.recordAnalyticsEvent=exports.matchesMetrics=exports.matchesEventType=exports.matchesAttributes=exports.logger=exports.isQuietTime=exports.isBeforeEndDate=exports.interpretLayout=exports.getStartOfDay=exports.getComparator=exports.extractMetadata=exports.extractContent=exports.dispatchInAppMessagingEvent=exports.clearMemo=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _core=__webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");var _isEmpty=_interopRequireDefault(__webpack_require__(/*! lodash/isEmpty */ "../../node_modules/lodash/isEmpty.js"));var _common=__webpack_require__(/*! ../../../common */ "./lib-esm/common/index.js");var DELIVERY_TYPE='IN_APP_MESSAGE';var eventNameMemo={};var eventAttributesMemo={};var eventMetricsMemo={};var logger=new _core.ConsoleLogger('InAppMessaging.AWSPinpointProvider');exports.logger=logger;var dispatchInAppMessagingEvent=function dispatchInAppMessagingEvent(event,data,message){_core.Hub.dispatch('inAppMessaging',{event:event,data:data,message:message},'InAppMessaging',_common.AMPLIFY_SYMBOL);};exports.dispatchInAppMessagingEvent=dispatchInAppMessagingEvent;var recordAnalyticsEvent=function recordAnalyticsEvent(event,message){if(_core.Amplify.Analytics&&typeof _core.Amplify.Analytics.record==='function'){var id=message.id,metadata=message.metadata;_core.Amplify.Analytics.record({name:event,attributes:{campaign_id:id,delivery_type:DELIVERY_TYPE,treatment_id:metadata===null||metadata===void 0?void 0:metadata.treatmentId}});}else{logger.debug('Analytics module is not registered into Amplify');}};exports.recordAnalyticsEvent=recordAnalyticsEvent;var getStartOfDay=function getStartOfDay(){var now=new Date();now.setHours(0,0,0,0);return now.toISOString();};exports.getStartOfDay=getStartOfDay;var matchesEventType=function matchesEventType(_a,_b){var CampaignId=_a.CampaignId,Schedule=_a.Schedule;var eventType=_b.name;var _c;var EventType=((_c=Schedule===null||Schedule===void 0?void 0:Schedule.EventFilter)===null||_c===void 0?void 0:_c.Dimensions).EventType;var memoKey=CampaignId+":"+eventType;if(!eventNameMemo.hasOwnProperty(memoKey)){eventNameMemo[memoKey]=!!(EventType===null||EventType===void 0?void 0:EventType.Values.includes(eventType));}return eventNameMemo[memoKey];};exports.matchesEventType=matchesEventType;var matchesAttributes=function matchesAttributes(_a,_b){var CampaignId=_a.CampaignId,Schedule=_a.Schedule;var attributes=_b.attributes;var _c;var Attributes=((_c=Schedule===null||Schedule===void 0?void 0:Schedule.EventFilter)===null||_c===void 0?void 0:_c.Dimensions).Attributes;if((0,_isEmpty["default"])(Attributes)){return true;}if((0,_isEmpty["default"])(attributes)){return false;}var memoKey=CampaignId+":"+JSON.stringify(attributes);if(!eventAttributesMemo.hasOwnProperty(memoKey)){eventAttributesMemo[memoKey]=Object.entries(Attributes).every(function(_a){var _b=(0,_tslib.__read)(_a,2),key=_b[0],Values=_b[1].Values;return Values.includes(attributes[key]);});}return eventAttributesMemo[memoKey];};exports.matchesAttributes=matchesAttributes;var matchesMetrics=function matchesMetrics(_a,_b){var CampaignId=_a.CampaignId,Schedule=_a.Schedule;var metrics=_b.metrics;var _c;var Metrics=((_c=Schedule===null||Schedule===void 0?void 0:Schedule.EventFilter)===null||_c===void 0?void 0:_c.Dimensions).Metrics;if((0,_isEmpty["default"])(Metrics)){return true;}if((0,_isEmpty["default"])(metrics)){return false;}var memoKey=CampaignId+":"+JSON.stringify(metrics);if(!eventMetricsMemo.hasOwnProperty(memoKey)){eventMetricsMemo[memoKey]=Object.entries(Metrics).every(function(_a){var _b=(0,_tslib.__read)(_a,2),key=_b[0],_c=_b[1],ComparisonOperator=_c.ComparisonOperator,Value=_c.Value;var compare=getComparator(ComparisonOperator);return compare?compare(Value,metrics[key]):false;});}return eventMetricsMemo[memoKey];};exports.matchesMetrics=matchesMetrics;var getComparator=function getComparator(operator){switch(operator){case'EQUAL':return function(metricsVal,eventVal){return metricsVal===eventVal;};case'GREATER_THAN':return function(metricsVal,eventVal){return metricsVal<eventVal;};case'GREATER_THAN_OR_EQUAL':return function(metricsVal,eventVal){return metricsVal<=eventVal;};case'LESS_THAN':return function(metricsVal,eventVal){return metricsVal>eventVal;};case'LESS_THAN_OR_EQUAL':return function(metricsVal,eventVal){return metricsVal>=eventVal;};default:return null;}};exports.getComparator=getComparator;var isBeforeEndDate=function isBeforeEndDate(_a){var Schedule=_a.Schedule;if(!(Schedule===null||Schedule===void 0?void 0:Schedule.EndDate)){return true;}return new Date()<new Date(Schedule.EndDate);};exports.isBeforeEndDate=isBeforeEndDate;var isQuietTime=function isQuietTime(message){var Schedule=message.Schedule;if(!(Schedule===null||Schedule===void 0?void 0:Schedule.QuietTime)){return false;}var pattern=/^[0-2]\d:[0-5]\d$/;var _a=Schedule.QuietTime,Start=_a.Start,End=_a.End;if(!Start||!End||Start===End||!pattern.test(Start)||!pattern.test(End)){return false;}var now=new Date();var start=new Date(now);var end=new Date(now);var _b=(0,_tslib.__read)(Start.split(':'),2),startHours=_b[0],startMinutes=_b[1];var _c=(0,_tslib.__read)(End.split(':'),2),endHours=_c[0],endMinutes=_c[1];start.setHours(Number.parseInt(startHours,10),Number.parseInt(startMinutes,10),0,0);end.setHours(Number.parseInt(endHours,10),Number.parseInt(endMinutes,10),0,0);if(start>end){end.setDate(end.getDate()+1);}var isQuietTime=now>=start&&now<=end;if(isQuietTime){logger.debug('message filtered due to quiet time',message);}return isQuietTime;};exports.isQuietTime=isQuietTime;var clearMemo=function clearMemo(){eventNameMemo={};eventAttributesMemo={};eventMetricsMemo={};};exports.clearMemo=clearMemo;var interpretLayout=function interpretLayout(layout){if(layout==='MOBILE_FEED'){return'MODAL';}if(layout==='OVERLAYS'){return'FULL_SCREEN';}return layout;};exports.interpretLayout=interpretLayout;var extractContent=function extractContent(_a){var message=_a.InAppMessage,_b=_a.platform,platform=_b===void 0?'Web':_b;var _c,_d;return(_d=(_c=message===null||message===void 0?void 0:message.Content)===null||_c===void 0?void 0:_c.map(function(content){var BackgroundColor=content.BackgroundColor,BodyConfig=content.BodyConfig,HeaderConfig=content.HeaderConfig,ImageUrl=content.ImageUrl,PrimaryBtn=content.PrimaryBtn,SecondaryBtn=content.SecondaryBtn;var getButtonConfig=function getButtonConfig(button,defaultConfig){return platform&&button&&button[platform]?(0,_tslib.__assign)((0,_tslib.__assign)({},defaultConfig),button[platform]):defaultConfig;};var defaultPrimaryButton=getButtonConfig(PrimaryBtn,PrimaryBtn===null||PrimaryBtn===void 0?void 0:PrimaryBtn.DefaultConfig);var defaultSecondaryButton=getButtonConfig(SecondaryBtn,SecondaryBtn===null||SecondaryBtn===void 0?void 0:SecondaryBtn.DefaultConfig);var extractedContent={};if(BackgroundColor){extractedContent.container={style:{backgroundColor:BackgroundColor}};}if(HeaderConfig){extractedContent.header={content:HeaderConfig.Header,style:{color:HeaderConfig.TextColor,textAlign:HeaderConfig.Alignment.toLowerCase()}};}if(BodyConfig){extractedContent.body={content:BodyConfig.Body,style:{color:BodyConfig.TextColor,textAlign:BodyConfig.Alignment.toLowerCase()}};}if(ImageUrl){extractedContent.image={src:ImageUrl};}if(defaultPrimaryButton){extractedContent.primaryButton={title:defaultPrimaryButton.Text,action:defaultPrimaryButton.ButtonAction,url:defaultPrimaryButton.Link,style:{backgroundColor:defaultPrimaryButton.BackgroundColor,borderRadius:defaultPrimaryButton.BorderRadius,color:defaultPrimaryButton.TextColor}};}if(defaultSecondaryButton){extractedContent.secondaryButton={title:defaultSecondaryButton.Text,action:defaultSecondaryButton.ButtonAction,url:defaultSecondaryButton.Link,style:{backgroundColor:defaultSecondaryButton.BackgroundColor,borderRadius:defaultSecondaryButton.BorderRadius,color:defaultSecondaryButton.TextColor}};}return extractedContent;}))!==null&&_d!==void 0?_d:[];};exports.extractContent=extractContent;var extractMetadata=function extractMetadata(_a){var InAppMessage=_a.InAppMessage,Priority=_a.Priority,Schedule=_a.Schedule,TreatmentId=_a.TreatmentId;return{customData:InAppMessage===null||InAppMessage===void 0?void 0:InAppMessage.CustomConfig,endDate:Schedule===null||Schedule===void 0?void 0:Schedule.EndDate,priority:Priority,treatmentId:TreatmentId};};exports.extractMetadata=extractMetadata;

/***/ }),

/***/ "./lib-esm/InAppMessaging/Providers/index.js":
/*!***************************************************!*\
  !*** ./lib-esm/InAppMessaging/Providers/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "AWSPinpointProvider", ({enumerable:true,get:function get(){return _AWSPinpointProvider["default"];}}));var _AWSPinpointProvider=_interopRequireDefault(__webpack_require__(/*! ./AWSPinpointProvider */ "./lib-esm/InAppMessaging/Providers/AWSPinpointProvider/index.js"));

/***/ }),

/***/ "./lib-esm/InAppMessaging/SessionTracker/SessionTracker.js":
/*!*****************************************************************!*\
  !*** ./lib-esm/InAppMessaging/SessionTracker/SessionTracker.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _core=__webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");var _noop=_interopRequireDefault(__webpack_require__(/*! lodash/noop */ "../../node_modules/lodash/noop.js"));var hidden;var visibilityChange;var isBrowser=(0,_core.browserOrNode)().isBrowser;if(isBrowser&&document){if(typeof document.hidden!=='undefined'){hidden='hidden';visibilityChange='visibilitychange';}else if(typeof document['msHidden']!=='undefined'){hidden='msHidden';visibilityChange='msvisibilitychange';}else if(typeof document['webkitHidden']!=='undefined'){hidden='webkitHidden';visibilityChange='webkitvisibilitychange';}}var logger=new _core.ConsoleLogger('InAppMessagingSessionTracker');var SessionTracker=function(){function SessionTracker(sessionStateChangeHandler){var _this=this;if(sessionStateChangeHandler===void 0){sessionStateChangeHandler=_noop["default"];}this.start=function(){if(isBrowser){document===null||document===void 0?void 0:document.addEventListener(visibilityChange,_this.visibilityChangeHandler);}return _this.getSessionState();};this.end=function(){if(isBrowser){document===null||document===void 0?void 0:document.removeEventListener(visibilityChange,_this.visibilityChangeHandler);}return _this.getSessionState();};this.getSessionState=function(){if(isBrowser&&document&&!document[hidden]){return'started';}return'ended';};this.visibilityChangeHandler=function(){if(!isBrowser||!document){return;}if(document[hidden]){logger.debug('App is now hidden');_this.sessionStateChangeHandler('ended');}else{logger.debug('App is now visible');_this.sessionStateChangeHandler('started');}};this.sessionStateChangeHandler=sessionStateChangeHandler;}return SessionTracker;}();var _default=SessionTracker;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/InAppMessaging/SessionTracker/index.js":
/*!********************************************************!*\
  !*** ./lib-esm/InAppMessaging/SessionTracker/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _SessionTracker=_interopRequireDefault(__webpack_require__(/*! ./SessionTracker */ "./lib-esm/InAppMessaging/SessionTracker/SessionTracker.js"));var _default=_SessionTracker["default"];exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/InAppMessaging/index.js":
/*!*****************************************!*\
  !*** ./lib-esm/InAppMessaging/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "InAppMessageInteractionEvent", ({enumerable:true,get:function get(){return _types.InAppMessageInteractionEvent;}}));Object.defineProperty(exports, "default", ({enumerable:true,get:function get(){return _InAppMessaging["default"];}}));var _InAppMessaging=_interopRequireDefault(__webpack_require__(/*! ./InAppMessaging */ "./lib-esm/InAppMessaging/InAppMessaging.js"));var _types=__webpack_require__(/*! ./types */ "./lib-esm/InAppMessaging/types.js");

/***/ }),

/***/ "./lib-esm/InAppMessaging/types.js":
/*!*****************************************!*\
  !*** ./lib-esm/InAppMessaging/types.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.InAppMessageInteractionEvent=void 0;var InAppMessageInteractionEvent;exports.InAppMessageInteractionEvent=InAppMessageInteractionEvent;(function(InAppMessageInteractionEvent){InAppMessageInteractionEvent["MESSAGE_RECEIVED"]="MESSAGE_RECEIVED_EVENT";InAppMessageInteractionEvent["MESSAGE_DISPLAYED"]="MESSAGE_DISPLAYED_EVENT";InAppMessageInteractionEvent["MESSAGE_DISMISSED"]="MESSAGE_DISMISSED_EVENT";InAppMessageInteractionEvent["MESSAGE_ACTION_TAKEN"]="MESSAGE_ACTION_TAKEN_EVENT";})(InAppMessageInteractionEvent||(exports.InAppMessageInteractionEvent=InAppMessageInteractionEvent={}));

/***/ }),

/***/ "./lib-esm/Notifications.js":
/*!**********************************!*\
  !*** ./lib-esm/Notifications.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _core=__webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");var _InAppMessaging=_interopRequireDefault(__webpack_require__(/*! ./InAppMessaging */ "./lib-esm/InAppMessaging/index.js"));var _PushNotification=_interopRequireDefault(__webpack_require__(/*! ./PushNotification */ "./lib-esm/PushNotification/index.js"));var logger=new _core.ConsoleLogger('Notifications');var NotificationsClass=function(){function NotificationsClass(){var _this=this;this.config={};this.configure=function(_a){var config=(_a===void 0?{}:_a).Notifications;_this.config=(0,_tslib.__assign)((0,_tslib.__assign)({},_this.config),config);logger.debug('configure Notifications',config);_this.inAppMessaging.configure(_this.config.InAppMessaging);if(_this.config.Push){try{if(!_this.pushNotification){_this.pushNotification=new _PushNotification["default"]();}_this.pushNotification.configure(_this.config.Push);}catch(err){logger.error(err);}}return _this.config;};this.identifyUser=function(userId,userInfo){var identifyFunctions=[];if(_this.inAppMessaging){identifyFunctions.push(_this.inAppMessaging.identifyUser);}if(_this.pushNotification){identifyFunctions.push(_this.pushNotification.identifyUser);}return Promise.all(identifyFunctions.map(function(identifyFunction){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var err_1;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,2,,3]);return[4,identifyFunction(userId,userInfo)];case 1:_a.sent();return[3,3];case 2:err_1=_a.sent();logger.error('Failed to identify user',err_1);throw err_1;case 3:return[2];}});});}));};this.inAppMessaging=new _InAppMessaging["default"]();}NotificationsClass.prototype.getModuleName=function(){return'Notifications';};Object.defineProperty(NotificationsClass.prototype,"InAppMessaging",{get:function get(){return this.inAppMessaging;},enumerable:true,configurable:true});Object.defineProperty(NotificationsClass.prototype,"Push",{get:function get(){var _a;return(_a=this.pushNotification)!==null&&_a!==void 0?_a:{};},enumerable:true,configurable:true});return NotificationsClass;}();var Notifications=new NotificationsClass();var _default=Notifications;exports["default"]=_default;_core.Amplify.register(Notifications);

/***/ }),

/***/ "./lib-esm/PushNotification/PlatformNotSupportedError.js":
/*!***************************************************************!*\
  !*** ./lib-esm/PushNotification/PlatformNotSupportedError.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var PlatformNotSupportedError=function(_super){(0,_tslib.__extends)(PlatformNotSupportedError,_super);function PlatformNotSupportedError(){var _this=_super.call(this,'Function not supported on current platform')||this;_this.name='PlatformNotSupportedError';return _this;}return PlatformNotSupportedError;}(Error);var _default=PlatformNotSupportedError;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/PushNotification/PushNotification.js":
/*!******************************************************!*\
  !*** ./lib-esm/PushNotification/PushNotification.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _PlatformNotSupportedError=_interopRequireDefault(__webpack_require__(/*! ./PlatformNotSupportedError */ "./lib-esm/PushNotification/PlatformNotSupportedError.js"));var PushNotification=function(){function PushNotification(){var _this=this;this.configure=function(_){if(_===void 0){_={};}throw new _PlatformNotSupportedError["default"]();};this.getPluggable=function(_){throw new _PlatformNotSupportedError["default"]();};this.addPluggable=function(_){throw new _PlatformNotSupportedError["default"]();};this.removePluggable=function(){throw new _PlatformNotSupportedError["default"]();};this.enable=function(){throw new _PlatformNotSupportedError["default"]();};this.identifyUser=function(){throw new _PlatformNotSupportedError["default"]();};this.getLaunchNotification=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){return(0,_tslib.__generator)(this,function(_a){throw new _PlatformNotSupportedError["default"]();});});};this.getBadgeCount=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){return(0,_tslib.__generator)(this,function(_a){throw new _PlatformNotSupportedError["default"]();});});};this.setBadgeCount=function(_){throw new _PlatformNotSupportedError["default"]();};this.getPermissionStatus=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){return(0,_tslib.__generator)(this,function(_a){throw new _PlatformNotSupportedError["default"]();});});};this.requestPermissions=function(_){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){return(0,_tslib.__generator)(this,function(_a){throw new _PlatformNotSupportedError["default"]();});});};this.onNotificationReceivedInBackground=function(_){throw new _PlatformNotSupportedError["default"]();};this.onNotificationReceivedInForeground=function(_){throw new _PlatformNotSupportedError["default"]();};this.onTokenReceived=function(_){throw new _PlatformNotSupportedError["default"]();};this.onNotificationOpened=function(_){throw new _PlatformNotSupportedError["default"]();};}PushNotification.prototype.getModuleName=function(){throw new _PlatformNotSupportedError["default"]();};return PushNotification;}();var _default=PushNotification;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/PushNotification/index.js":
/*!*******************************************!*\
  !*** ./lib-esm/PushNotification/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "PushNotificationPermissionStatus", ({enumerable:true,get:function get(){return _types.PushNotificationPermissionStatus;}}));Object.defineProperty(exports, "default", ({enumerable:true,get:function get(){return _PushNotification["default"];}}));var _PushNotification=_interopRequireDefault(__webpack_require__(/*! ./PushNotification */ "./lib-esm/PushNotification/PushNotification.js"));var _types=__webpack_require__(/*! ./types */ "./lib-esm/PushNotification/types.js");

/***/ }),

/***/ "./lib-esm/PushNotification/types.js":
/*!*******************************************!*\
  !*** ./lib-esm/PushNotification/types.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.PushNotificationPermissionStatus=void 0;var PushNotificationPermissionStatus;exports.PushNotificationPermissionStatus=PushNotificationPermissionStatus;(function(PushNotificationPermissionStatus){PushNotificationPermissionStatus["DENIED"]="DENIED";PushNotificationPermissionStatus["GRANTED"]="GRANTED";PushNotificationPermissionStatus["SHOULD_REQUEST"]="SHOULD_REQUEST";PushNotificationPermissionStatus["SHOULD_EXPLAIN_THEN_REQUEST"]="SHOULD_EXPLAIN_THEN_REQUEST";})(PushNotificationPermissionStatus||(exports.PushNotificationPermissionStatus=PushNotificationPermissionStatus={}));

/***/ }),

/***/ "./lib-esm/common/AWSPinpointProviderCommon/index.js":
/*!***********************************************************!*\
  !*** ./lib-esm/common/AWSPinpointProviderCommon/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var _core=__webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");var _cache=__webpack_require__(/*! @aws-amplify/cache */ "@aws-amplify/cache");var _pinpoint=__webpack_require__(/*! @aws-amplify/core/internals/aws-clients/pinpoint */ "../core/lib-esm/AwsClients/Pinpoint/index.js");var _uuid=__webpack_require__(/*! uuid */ "../../node_modules/uuid/index.js");var AWSPinpointProviderCommon=function(){function AWSPinpointProviderCommon(logger){var _this=this;var _a;this.config={};this.endpointInitialized=false;this.initialized=false;this.identifyUser=function(userId,userInfo){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var err_1;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:if(!!this.initialized)return[3,2];return[4,this.init()];case 1:_a.sent();_a.label=2;case 2:_a.trys.push([2,4,,5]);return[4,this.updateEndpoint(userId,userInfo)];case 3:_a.sent();return[3,5];case 4:err_1=_a.sent();this.logger.error('Error identifying user',err_1);throw err_1;case 5:return[2];}});});};this.init=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var _a,endpointId,storage,providerName,_b,err_2;return(0,_tslib.__generator)(this,function(_c){switch(_c.label){case 0:_a=this.config,endpointId=_a.endpointId,storage=_a.storage;providerName=this.getProviderName();_c.label=1;case 1:_c.trys.push([1,6,,7]);if(!(typeof storage.sync==='function'))return[3,3];return[4,storage.sync()];case 2:_c.sent();_c.label=3;case 3:if(!!endpointId)return[3,5];_b=this.config;return[4,this.getEndpointId()];case 4:_b.endpointId=_c.sent();_c.label=5;case 5:this.initialized=true;return[3,7];case 6:err_2=_c.sent();this.logger.error("Failed to initialize "+providerName,err_2);return[3,7];case 7:return[2];}});});};this.getUserAgentValue=function(){var customUserAgentDetails;if(_this.getSubCategory()==='PushNotification'){customUserAgentDetails={category:_core.Category.PushNotification,action:_core.PushNotificationAction.None};}else{customUserAgentDetails={category:_core.Category.InAppMessaging,action:_core.InAppMessagingAction.None};}return(0,_core.getAmplifyUserAgent)(customUserAgentDetails);};this.recordAnalyticsEvent=function(event){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var _a,_b,appId,credentials,endpointId,region,input,err_3;var _c,_d;return(0,_tslib.__generator)(this,function(_e){switch(_e.label){case 0:_a=this.config;return[4,this.getCredentials()];case 1:_a.credentials=_e.sent();this.assertNotEmptyConfiguration();_b=this.config,appId=_b.appId,credentials=_b.credentials,endpointId=_b.endpointId,region=_b.region;_e.label=2;case 2:_e.trys.push([2,4,,5]);input={ApplicationId:appId,EventsRequest:{BatchItem:(_c={},_c[endpointId]={Endpoint:{},Events:(_d={},_d[(0,_uuid.v4)()]=event,_d)},_c)}};this.logger.debug('recording analytics event');return[4,(0,_pinpoint.putEvents)({credentials:credentials,region:region,userAgentValue:this.getUserAgentValue()},input)];case 3:_e.sent();return[3,5];case 4:err_3=_e.sent();this.logger.error('Error recording analytics event',err_3);throw err_3;case 5:return[2];}});});};this.updateEndpoint=function(userId,userInfo){if(userId===void 0){userId=null;}if(userInfo===void 0){userInfo=null;}return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var credentials,credentialsUpdated,_a,appId,endpointId,_b,endpointInfo,region,_c,address,attributes,demographic,location_1,metrics,optOut,_d,appVersion,make,model,platform,version,input,err_4;var _this=this;var _e;return(0,_tslib.__generator)(this,function(_f){switch(_f.label){case 0:return[4,this.getCredentials()];case 1:credentials=_f.sent();credentialsUpdated=!this.config.credentials||Object.keys(credentials).some(function(key){return credentials[key]!==_this.config.credentials[key];});if(this.endpointInitialized&&!credentialsUpdated&&!userId&&!userInfo){return[2];}this.config.credentials=credentials;this.assertNotEmptyConfiguration();_a=this.config,appId=_a.appId,endpointId=_a.endpointId,_b=_a.endpointInfo,endpointInfo=_b===void 0?{}:_b,region=_a.region;_f.label=2;case 2:_f.trys.push([2,4,,5]);_c=userInfo!==null&&userInfo!==void 0?userInfo:{},address=_c.address,attributes=_c.attributes,demographic=_c.demographic,location_1=_c.location,metrics=_c.metrics,optOut=_c.optOut;_d=this.clientInfo,appVersion=_d.appVersion,make=_d.make,model=_d.model,platform=_d.platform,version=_d.version;input={ApplicationId:appId,EndpointId:endpointId,EndpointRequest:{RequestId:(0,_uuid.v4)(),EffectiveDate:new Date().toISOString(),ChannelType:endpointInfo.channelType,Address:address!==null&&address!==void 0?address:endpointInfo.address,Attributes:(0,_tslib.__assign)((0,_tslib.__assign)({},endpointInfo.attributes),attributes),Demographic:(0,_tslib.__assign)({AppVersion:appVersion,Make:make,Model:model,ModelVersion:version,Platform:platform},(0,_core.transferKeyToUpperCase)((0,_tslib.__assign)((0,_tslib.__assign)({},endpointInfo.demographic),demographic))),Location:(0,_core.transferKeyToUpperCase)((0,_tslib.__assign)((0,_tslib.__assign)({},endpointInfo.location),location_1)),Metrics:(0,_tslib.__assign)((0,_tslib.__assign)({},endpointInfo.metrics),metrics),OptOut:optOut!==null&&optOut!==void 0?optOut:endpointInfo.optOut,User:{UserId:(_e=userId!==null&&userId!==void 0?userId:endpointInfo.userId)!==null&&_e!==void 0?_e:credentials.identityId,UserAttributes:attributes!==null&&attributes!==void 0?attributes:endpointInfo.userAttributes}}};this.logger.debug('updating endpoint');return[4,(0,_pinpoint.updateEndpoint)({credentials:credentials,region:region,userAgentValue:this.getUserAgentValue()},input)];case 3:_f.sent();this.endpointInitialized=true;return[3,5];case 4:err_4=_f.sent();throw err_4;case 5:return[2];}});});};this.getEndpointId=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var appId,cacheKey,cachedEndpointId,endpointId,ttl,expiration;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:appId=this.config.appId;cacheKey=this.getSubCategory()==='PushNotification'?this.getProviderName()+"_"+appId:this.getSubCategory()+":"+this.getProviderName()+":"+appId;return[4,_cache.Cache.getItem(cacheKey)];case 1:cachedEndpointId=_a.sent();if(cachedEndpointId){return[2,cachedEndpointId];}endpointId=(0,_uuid.v4)();ttl=1000*60*60*24*365*100;expiration=new Date().getTime()+ttl;_cache.Cache.setItem(cacheKey,endpointId,{expires:expiration,priority:1});return[2,endpointId];}});});};this.getCredentials=function(){return(0,_tslib.__awaiter)(_this,void 0,void 0,function(){var credentials,err_5;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,2,,3]);return[4,_core.Credentials.get()];case 1:credentials=_a.sent();if(!credentials){this.logger.debug('no credentials found');return[2,null];}return[2,_core.Credentials.shear(credentials)];case 2:err_5=_a.sent();this.logger.error('Error getting credentials:',err_5);return[2,null];case 3:return[2];}});});};this.assertNotEmptyConfiguration=function(){var _a=_this.config,appId=_a.appId,credentials=_a.credentials,region=_a.region;if(!appId||!credentials||!region){throw new Error('One or more of credentials, appId or region is not configured');}};this.config={storage:new _core.StorageHelper().getStorage()};this.clientInfo=(_a=_core.ClientDevice.clientInfo())!==null&&_a!==void 0?_a:{};this.logger=logger;}AWSPinpointProviderCommon.prototype.getCategory=function(){return AWSPinpointProviderCommon.category;};AWSPinpointProviderCommon.prototype.getProviderName=function(){return AWSPinpointProviderCommon.providerName;};AWSPinpointProviderCommon.prototype.configure=function(config){if(config===void 0){config={};}this.config=(0,_tslib.__assign)((0,_tslib.__assign)({},this.config),config);this.logger.debug("configure "+this.getProviderName()+this.getSubCategory()+"Provider",this.config);return this.config;};AWSPinpointProviderCommon.category='Notifications';AWSPinpointProviderCommon.providerName='AWSPinpoint';return AWSPinpointProviderCommon;}();var _default=AWSPinpointProviderCommon;exports["default"]=_default;

/***/ }),

/***/ "./lib-esm/common/constants.js":
/*!*************************************!*\
  !*** ./lib-esm/common/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.AMPLIFY_SYMBOL=void 0;var AMPLIFY_SYMBOL=typeof Symbol!=='undefined'&&typeof Symbol["for"]==='function'?Symbol["for"]('amplify_default'):'@@amplify_default';exports.AMPLIFY_SYMBOL=AMPLIFY_SYMBOL;

/***/ }),

/***/ "./lib-esm/common/eventListeners/index.js":
/*!************************************************!*\
  !*** ./lib-esm/common/eventListeners/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.notifyEventListenersAndAwaitHandlers=exports.notifyEventListeners=exports.addEventListener=void 0;var _tslib=__webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");var eventListeners={};var notifyEventListeners=function notifyEventListeners(type){var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i];}var _a;(_a=eventListeners[type])===null||_a===void 0?void 0:_a.forEach(function(listener){listener.handleEvent.apply(listener,(0,_tslib.__spread)(args));});};exports.notifyEventListeners=notifyEventListeners;var notifyEventListenersAndAwaitHandlers=function notifyEventListenersAndAwaitHandlers(type){var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i];}var _a;return Promise.all(Array.from((_a=eventListeners[type])!==null&&_a!==void 0?_a:[]).map(function(listener){return(0,_tslib.__awaiter)(void 0,void 0,void 0,function(){var err_1;return(0,_tslib.__generator)(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,2,,3]);return[4,listener.handleEvent.apply(listener,(0,_tslib.__spread)(args))];case 1:_a.sent();return[3,3];case 2:err_1=_a.sent();throw err_1;case 3:return[2];}});});}));};exports.notifyEventListenersAndAwaitHandlers=notifyEventListenersAndAwaitHandlers;var addEventListener=function addEventListener(type,handler){if(!eventListeners[type]){eventListeners[type]=new Set();}var listener={handleEvent:handler,remove:function remove(){eventListeners[type]["delete"](listener);}};eventListeners[type].add(listener);return listener;};exports.addEventListener=addEventListener;

/***/ }),

/***/ "./lib-esm/common/index.js":
/*!*********************************!*\
  !*** ./lib-esm/common/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "AMPLIFY_SYMBOL", ({enumerable:true,get:function get(){return _constants.AMPLIFY_SYMBOL;}}));Object.defineProperty(exports, "AWSPinpointProviderCommon", ({enumerable:true,get:function get(){return _AWSPinpointProviderCommon["default"];}}));Object.defineProperty(exports, "addEventListener", ({enumerable:true,get:function get(){return _eventListeners.addEventListener;}}));Object.defineProperty(exports, "notifyEventListeners", ({enumerable:true,get:function get(){return _eventListeners.notifyEventListeners;}}));Object.defineProperty(exports, "notifyEventListenersAndAwaitHandlers", ({enumerable:true,get:function get(){return _eventListeners.notifyEventListenersAndAwaitHandlers;}}));var _AWSPinpointProviderCommon=_interopRequireDefault(__webpack_require__(/*! ./AWSPinpointProviderCommon */ "./lib-esm/common/AWSPinpointProviderCommon/index.js"));var _constants=__webpack_require__(/*! ./constants */ "./lib-esm/common/constants.js");var _eventListeners=__webpack_require__(/*! ./eventListeners */ "./lib-esm/common/eventListeners/index.js");

/***/ }),

/***/ "../../node_modules/isomorphic-unfetch/browser.js":
/*!********************************************************!*\
  !*** ../../node_modules/isomorphic-unfetch/browser.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = self.fetch || (self.fetch = (__webpack_require__(/*! unfetch */ "../../node_modules/unfetch/dist/unfetch.module.js")["default"]) || __webpack_require__(/*! unfetch */ "../../node_modules/unfetch/dist/unfetch.module.js"));


/***/ }),

/***/ "../../node_modules/lodash/_DataView.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_DataView.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "../../node_modules/lodash/_Map.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Map.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../../node_modules/lodash/_Promise.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_Promise.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "../../node_modules/lodash/_Set.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/_Set.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "../../node_modules/lodash/_Symbol.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_Symbol.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../../node_modules/lodash/_WeakMap.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_WeakMap.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "../../node_modules/lodash/_arrayPush.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_arrayPush.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "../../node_modules/lodash/_baseFlatten.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_baseFlatten.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../../node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ "../../node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetTag.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseGetTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsArguments.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_baseIsArguments.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsNative.js":
/*!**************************************************!*\
  !*** ../../node_modules/lodash/_baseIsNative.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../../node_modules/lodash/_baseIsTypedArray.js":
/*!******************************************************!*\
  !*** ../../node_modules/lodash/_baseIsTypedArray.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/_baseKeys.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_baseKeys.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "../../node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "../../node_modules/lodash/_baseUnary.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_baseUnary.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../../node_modules/lodash/_coreJsData.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_coreJsData.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../../node_modules/lodash/_freeGlobal.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_freeGlobal.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "../../node_modules/lodash/_getNative.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getNative.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../../node_modules/lodash/_getRawTag.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getRawTag.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../../node_modules/lodash/_getTag.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_getTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "../../node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "../../node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "../../node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "../../node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "../../node_modules/lodash/_getValue.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_getValue.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../../node_modules/lodash/_isFlattenable.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash/_isFlattenable.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "../../node_modules/lodash/_isMasked.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_isMasked.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../../node_modules/lodash/_isPrototype.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/_isPrototype.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../../node_modules/lodash/_nativeKeys.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_nativeKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "../../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../../node_modules/lodash/_nodeUtil.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_nodeUtil.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "../../node_modules/lodash/_objectToString.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_objectToString.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../../node_modules/lodash/_overArg.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/_overArg.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "../../node_modules/lodash/_root.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/_root.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../../node_modules/lodash/_toSource.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_toSource.js ***!
  \**********************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../../node_modules/lodash/flatten.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/flatten.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "../../node_modules/lodash/_baseFlatten.js");

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ "../../node_modules/lodash/isArguments.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArguments.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../../node_modules/lodash/isArray.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/isArray.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../../node_modules/lodash/isArrayLike.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/isArrayLike.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../../node_modules/lodash/isBuffer.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "../../node_modules/lodash/isEmpty.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/isEmpty.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseKeys = __webpack_require__(/*! ./_baseKeys */ "../../node_modules/lodash/_baseKeys.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../node_modules/lodash/_getTag.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../node_modules/lodash/isArray.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../node_modules/lodash/isArrayLike.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../node_modules/lodash/isBuffer.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../node_modules/lodash/_isPrototype.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../node_modules/lodash/isTypedArray.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),

/***/ "../../node_modules/lodash/isFunction.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/isFunction.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../../node_modules/lodash/isLength.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isLength.js ***!
  \*********************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../../node_modules/lodash/isObject.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isObject.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../../node_modules/lodash/isObjectLike.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isObjectLike.js ***!
  \*************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../../node_modules/lodash/isTypedArray.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../../node_modules/lodash/noop.js":
/*!*****************************************!*\
  !*** ../../node_modules/lodash/noop.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "../../node_modules/lodash/stubFalse.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/stubFalse.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.js":
/*!*********************************************!*\
  !*** ../../node_modules/tslib/tslib.es6.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../../node_modules/unfetch/dist/unfetch.module.js":
/*!*********************************************************!*\
  !*** ../../node_modules/unfetch/dist/unfetch.module.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})}
//# sourceMappingURL=unfetch.module.js.map


/***/ }),

/***/ "../../node_modules/uuid/index.js":
/*!****************************************!*\
  !*** ../../node_modules/uuid/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(/*! ./v1 */ "../../node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "../../node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!**************************************************!*\
  !*** ../../node_modules/uuid/lib/bytesToUuid.js ***!
  \**************************************************/
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "../../node_modules/uuid/lib/rng-browser.js":
/*!**************************************************!*\
  !*** ../../node_modules/uuid/lib/rng-browser.js ***!
  \**************************************************/
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "../../node_modules/uuid/v1.js":
/*!*************************************!*\
  !*** ../../node_modules/uuid/v1.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!*************************************!*\
  !*** ../../node_modules/uuid/v4.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "@aws-amplify/cache":
/*!************************************!*\
  !*** external "aws_amplify_cache" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_cache__;

/***/ }),

/***/ "@aws-amplify/core":
/*!***********************************!*\
  !*** external "aws_amplify_core" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/extends.js":
/*!************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/extends.js ***!
  \************************************************************/
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**************************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/typeof.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/typeof.js ***!
  \***********************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************!*\
  !*** ./lib-esm/index.js ***!
  \**************************/
var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports, "__esModule", ({value:true}));Object.defineProperty(exports, "AWSPinpointProviderCommon", ({enumerable:true,get:function get(){return _common.AWSPinpointProviderCommon;}}));Object.defineProperty(exports, "InAppMessageInteractionEvent", ({enumerable:true,get:function get(){return _InAppMessaging.InAppMessageInteractionEvent;}}));Object.defineProperty(exports, "Notifications", ({enumerable:true,get:function get(){return _Notifications["default"];}}));Object.defineProperty(exports, "PushNotificationPermissionStatus", ({enumerable:true,get:function get(){return _types.PushNotificationPermissionStatus;}}));var _Notifications=_interopRequireDefault(__webpack_require__(/*! ./Notifications */ "./lib-esm/Notifications.js"));var _common=__webpack_require__(/*! ./common */ "./lib-esm/common/index.js");var _InAppMessaging=__webpack_require__(/*! ./InAppMessaging */ "./lib-esm/InAppMessaging/index.js");var _types=__webpack_require__(/*! ./PushNotification/types */ "./lib-esm/PushNotification/types.js");
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-notifications.js.map