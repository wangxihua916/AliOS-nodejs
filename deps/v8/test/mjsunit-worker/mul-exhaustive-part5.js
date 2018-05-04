// Copyright 2008 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker//mul-exhaustive-part5.js");
	}
}
var x;

// Converts a number to string respecting -0.
function stringify(n) {
  if ((1 / n) === -Infinity) return "-0";
  return String(n);
}

function f(expected, y) {
  function testEval(string, x, y) {
    var mulFunction = Function("x, y", "return " + string);
    return mulFunction(x, y);
  }
  function mulTest(expected, x, y) {
    assertEquals(expected, x * y);
    assertEquals(expected, testEval(stringify(x) + " * y", x, y));
    assertEquals(expected, testEval("x * " + stringify(y), x, y));
    assertEquals(expected, testEval(stringify(x) + " * " + stringify(y), x, y));
  }
  mulTest(expected, x, y);
  mulTest(-expected, -x, y);
  mulTest(-expected, x, -y);
  mulTest(expected, -x, -y);
  if (x === y) return;  // Symmetric cases not necessary.
  mulTest(expected, y, x);
  mulTest(-expected, -y, x);
  mulTest(-expected, y, -x);
  mulTest(expected, -y, -x);
}

x = 1048577;
f(0, 0);
f(1048577, 1);
f(2097154, 2);
f(3145731, 3);
f(4194308, 4);
f(5242885, 5);
f(7340039, 7);
f(8388616, 8);
f(9437193, 9);
f(15728655, 15);
f(16777232, 16);
f(17825809, 17);
f(32505887, 31);
f(33554464, 32);
f(34603041, 33);
f(66060351, 63);
f(67108928, 64);
f(68157505, 65);
f(133169279, 127);
f(134217856, 128);
f(135266433, 129);
f(267387135, 255);
f(268435712, 256);
f(269484289, 257);
f(535822847, 511);
f(536871424, 512);
f(537920001, 513);
f(1072694271, 1023);
f(1073742848, 1024);
f(1074791425, 1025);
f(2146437119, 2047);
f(2147485696, 2048);
f(2148534273, 2049);
f(4293922815, 4095);
f(4294971392, 4096);
f(4296019969, 4097);
f(8588894207, 8191);
f(8589942784, 8192);
f(8590991361, 8193);
f(17178836991, 16383);
f(17179885568, 16384);
f(17180934145, 16385);
f(34358722559, 32767);
f(34359771136, 32768);
f(34360819713, 32769);
f(68718493695, 65535);
f(68719542272, 65536);
f(68720590849, 65537);
f(137438035967, 131071);
f(137439084544, 131072);
f(137440133121, 131073);
f(274877120511, 262143);
f(274878169088, 262144);
f(274879217665, 262145);
f(549755289599, 524287);
f(549756338176, 524288);
f(549757386753, 524289);
f(1099511627775, 1048575);
f(1099512676352, 1048576);
f(1099513724929, 1048577);
x = 2097151;
f(0, 0);
f(2097151, 1);
f(4194302, 2);
f(6291453, 3);
f(8388604, 4);
f(10485755, 5);
f(14680057, 7);
f(16777208, 8);
f(18874359, 9);
f(31457265, 15);
f(33554416, 16);
f(35651567, 17);
f(65011681, 31);
f(67108832, 32);
f(69205983, 33);
f(132120513, 63);
f(134217664, 64);
f(136314815, 65);
f(266338177, 127);
f(268435328, 128);
f(270532479, 129);
f(534773505, 255);
f(536870656, 256);
f(538967807, 257);
f(1071644161, 511);
f(1073741312, 512);
f(1075838463, 513);
f(2145385473, 1023);
f(2147482624, 1024);
f(2149579775, 1025);
f(4292868097, 2047);
f(4294965248, 2048);
f(4297062399, 2049);
f(8587833345, 4095);
f(8589930496, 4096);
f(8592027647, 4097);
f(17177763841, 8191);
f(17179860992, 8192);
f(17181958143, 8193);
f(34357624833, 16383);
f(34359721984, 16384);
f(34361819135, 16385);
f(68717346817, 32767);
f(68719443968, 32768);
f(68721541119, 32769);
f(137436790785, 65535);
f(137438887936, 65536);
f(137440985087, 65537);
f(274875678721, 131071);
f(274877775872, 131072);
f(274879873023, 131073);
f(549753454593, 262143);
f(549755551744, 262144);
f(549757648895, 262145);
f(1099509006337, 524287);
f(1099511103488, 524288);
f(1099513200639, 524289);
f(2199020109825, 1048575);
f(2199022206976, 1048576);
f(2199024304127, 1048577);
f(4398042316801, 2097151);
x = 2097152;
f(0, 0);
f(2097152, 1);
f(4194304, 2);
f(6291456, 3);
f(8388608, 4);
f(10485760, 5);
f(14680064, 7);
f(16777216, 8);
f(18874368, 9);
f(31457280, 15);
f(33554432, 16);
f(35651584, 17);
f(65011712, 31);
f(67108864, 32);
f(69206016, 33);
f(132120576, 63);
f(134217728, 64);
f(136314880, 65);
f(266338304, 127);
f(268435456, 128);
f(270532608, 129);
f(534773760, 255);
f(536870912, 256);
f(538968064, 257);
f(1071644672, 511);
f(1073741824, 512);
f(1075838976, 513);
f(2145386496, 1023);
f(2147483648, 1024);
f(2149580800, 1025);
f(4292870144, 2047);
f(4294967296, 2048);
f(4297064448, 2049);
f(8587837440, 4095);
f(8589934592, 4096);
f(8592031744, 4097);
f(17177772032, 8191);
f(17179869184, 8192);
f(17181966336, 8193);
f(34357641216, 16383);
f(34359738368, 16384);
f(34361835520, 16385);
f(68717379584, 32767);
f(68719476736, 32768);
f(68721573888, 32769);
f(137436856320, 65535);
f(137438953472, 65536);
f(137441050624, 65537);
f(274875809792, 131071);
f(274877906944, 131072);
f(274880004096, 131073);
f(549753716736, 262143);
f(549755813888, 262144);
f(549757911040, 262145);
f(1099509530624, 524287);
f(1099511627776, 524288);
f(1099513724928, 524289);
f(2199021158400, 1048575);
f(2199023255552, 1048576);
f(2199025352704, 1048577);
f(4398044413952, 2097151);
f(4398046511104, 2097152);
x = 2097153;
f(0, 0);
f(2097153, 1);
f(4194306, 2);
f(6291459, 3);
f(8388612, 4);
f(10485765, 5);
f(14680071, 7);
f(16777224, 8);
f(18874377, 9);
f(31457295, 15);
f(33554448, 16);
f(35651601, 17);
f(65011743, 31);
f(67108896, 32);
f(69206049, 33);
f(132120639, 63);
f(134217792, 64);
f(136314945, 65);
f(266338431, 127);
f(268435584, 128);
f(270532737, 129);
f(534774015, 255);
f(536871168, 256);
f(538968321, 257);
f(1071645183, 511);
f(1073742336, 512);
f(1075839489, 513);
f(2145387519, 1023);
f(2147484672, 1024);
f(2149581825, 1025);
f(4292872191, 2047);
f(4294969344, 2048);
f(4297066497, 2049);
f(8587841535, 4095);
f(8589938688, 4096);
f(8592035841, 4097);
f(17177780223, 8191);
f(17179877376, 8192);
f(17181974529, 8193);
f(34357657599, 16383);
f(34359754752, 16384);
f(34361851905, 16385);
f(68717412351, 32767);
f(68719509504, 32768);
f(68721606657, 32769);
f(137436921855, 65535);
f(137439019008, 65536);
f(137441116161, 65537);
f(274875940863, 131071);
f(274878038016, 131072);
f(274880135169, 131073);
f(549753978879, 262143);
f(549756076032, 262144);
f(549758173185, 262145);
f(1099510054911, 524287);
f(1099512152064, 524288);
f(1099514249217, 524289);
f(2199022206975, 1048575);
f(2199024304128, 1048576);
f(2199026401281, 1048577);
f(4398046511103, 2097151);
f(4398048608256, 2097152);
f(4398050705409, 2097153);
x = 4194303;
f(0, 0);
f(4194303, 1);
f(8388606, 2);
f(12582909, 3);
f(16777212, 4);
f(20971515, 5);
f(29360121, 7);
f(33554424, 8);
f(37748727, 9);
f(62914545, 15);
f(67108848, 16);
f(71303151, 17);
f(130023393, 31);
f(134217696, 32);
f(138411999, 33);
f(264241089, 63);
f(268435392, 64);
f(272629695, 65);
f(532676481, 127);
f(536870784, 128);
f(541065087, 129);
f(1069547265, 255);
f(1073741568, 256);
f(1077935871, 257);
f(2143288833, 511);
f(2147483136, 512);
f(2151677439, 513);
f(4290771969, 1023);
f(4294966272, 1024);
f(4299160575, 1025);
f(8585738241, 2047);
f(8589932544, 2048);
f(8594126847, 2049);
f(17175670785, 4095);
f(17179865088, 4096);
f(17184059391, 4097);
f(34355535873, 8191);
f(34359730176, 8192);
f(34363924479, 8193);
f(68715266049, 16383);
f(68719460352, 16384);
f(68723654655, 16385);
f(137434726401, 32767);
f(137438920704, 32768);
f(137443115007, 32769);
f(274873647105, 65535);
f(274877841408, 65536);
f(274882035711, 65537);
f(549751488513, 131071);
f(549755682816, 131072);
f(549759877119, 131073);
f(1099507171329, 262143);
f(1099511365632, 262144);
f(1099515559935, 262145);
f(2199018536961, 524287);
f(2199022731264, 524288);
f(2199026925567, 524289);
f(4398041268225, 1048575);
f(4398045462528, 1048576);
f(4398049656831, 1048577);
f(8796086730753, 2097151);
f(8796090925056, 2097152);
f(8796095119359, 2097153);
f(17592177655809, 4194303);
x = 4194304;
f(0, 0);
f(4194304, 1);
f(8388608, 2);
f(12582912, 3);
f(16777216, 4);
f(20971520, 5);
f(29360128, 7);
f(33554432, 8);
f(37748736, 9);
f(62914560, 15);
f(67108864, 16);
f(71303168, 17);
f(130023424, 31);
f(134217728, 32);
f(138412032, 33);
f(264241152, 63);
f(268435456, 64);
f(272629760, 65);
f(532676608, 127);
f(536870912, 128);
f(541065216, 129);
f(1069547520, 255);
f(1073741824, 256);
f(1077936128, 257);
f(2143289344, 511);
f(2147483648, 512);
f(2151677952, 513);
f(4290772992, 1023);
f(4294967296, 1024);
f(4299161600, 1025);
f(8585740288, 2047);
f(8589934592, 2048);
f(8594128896, 2049);
f(17175674880, 4095);
f(17179869184, 4096);
f(17184063488, 4097);
f(34355544064, 8191);
f(34359738368, 8192);
f(34363932672, 8193);
f(68715282432, 16383);
f(68719476736, 16384);
f(68723671040, 16385);
f(137434759168, 32767);
f(137438953472, 32768);
f(137443147776, 32769);
f(274873712640, 65535);
f(274877906944, 65536);
f(274882101248, 65537);
f(549751619584, 131071);
f(549755813888, 131072);
f(549760008192, 131073);
f(1099507433472, 262143);
f(1099511627776, 262144);
f(1099515822080, 262145);
f(2199019061248, 524287);
f(2199023255552, 524288);
f(2199027449856, 524289);
f(4398042316800, 1048575);
f(4398046511104, 1048576);
f(4398050705408, 1048577);
f(8796088827904, 2097151);
f(8796093022208, 2097152);
f(8796097216512, 2097153);
f(17592181850112, 4194303);
f(17592186044416, 4194304);
x = 4194305;
f(0, 0);
f(4194305, 1);
f(8388610, 2);
f(12582915, 3);
f(16777220, 4);
f(20971525, 5);
f(29360135, 7);
f(33554440, 8);
f(37748745, 9);
f(62914575, 15);
f(67108880, 16);
f(71303185, 17);
f(130023455, 31);
f(134217760, 32);
f(138412065, 33);
f(264241215, 63);
f(268435520, 64);
f(272629825, 65);
f(532676735, 127);
f(536871040, 128);
f(541065345, 129);
f(1069547775, 255);
f(1073742080, 256);
f(1077936385, 257);
f(2143289855, 511);
f(2147484160, 512);
f(2151678465, 513);
f(4290774015, 1023);
f(4294968320, 1024);
f(4299162625, 1025);
f(8585742335, 2047);
f(8589936640, 2048);
f(8594130945, 2049);
f(17175678975, 4095);
f(17179873280, 4096);
f(17184067585, 4097);
f(34355552255, 8191);
f(34359746560, 8192);
f(34363940865, 8193);
f(68715298815, 16383);
f(68719493120, 16384);
f(68723687425, 16385);
f(137434791935, 32767);
f(137438986240, 32768);
f(137443180545, 32769);
f(274873778175, 65535);
f(274877972480, 65536);
f(274882166785, 65537);
f(549751750655, 131071);
f(549755944960, 131072);
f(549760139265, 131073);
f(1099507695615, 262143);
f(1099511889920, 262144);
f(1099516084225, 262145);
f(2199019585535, 524287);
f(2199023779840, 524288);
f(2199027974145, 524289);
f(4398043365375, 1048575);
f(4398047559680, 1048576);
f(4398051753985, 1048577);
f(8796090925055, 2097151);
f(8796095119360, 2097152);
f(8796099313665, 2097153);
f(17592186044415, 4194303);
f(17592190238720, 4194304);
f(17592194433025, 4194305);
