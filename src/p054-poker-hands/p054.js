"use strict";

const util = require('util')
var hands = require('./hands.js');

function logit(obj) {
    return util.inspect(obj, false, null);
}

function getCardRank(card) {
    return card;
}

function getCardSuit(card) {
    return card.substring(1,2);
}

function mapRankToNumber(rank) {
    var value = parseInt(rank);
    if (isNaN(value)) {
        switch (rank) {
        case 'T' :
            value = 10;
            break;
        case 'J' :
            value = 11;
            break;
        case 'Q' :
            value = 12;
            break;
        case 'K' :
            value = 13;
            break;
        case 'A' :
            value = 14;
            break;
        }
    }
    return value;
}

function mapRanksToNumbers(hand) {
    var ranksAsNumbers = hand.map(function(card) {
        return mapRankToNumber(card.substring(0,1));
    });
    return ranksAsNumbers;
}

function buildIndex(hand, selector) {
    return hand.reduce(function(accumulator, currentValue, index, array) {
        var value = selector(currentValue);
        if (accumulator[value]) {
            accumulator[value].push(index);
        } else {
            accumulator[value] = [index];
        }
        return accumulator;
    }, {});
}

function buildRankIndex(handWithIndex) {
    var index = buildIndex(handWithIndex.ranksAsNumbers, getCardRank);
    return index;
}

function buildSuitIndex(hand) { 
    var index = buildIndex(hand, getCardSuit);
    return index;
}

function findRanks(handWithIndex) {
    var ranks = {};

    ranks['highest'] = findHigh(handWithIndex);
    ranks['pair'] = findPair(handWithIndex);
    ranks['twoPairs'] = findTwoPairs(handWithIndex);
    ranks['threeOfAKind'] = findThreeOfAKind(handWithIndex);
    ranks['straight'] = findStraight(handWithIndex);
    ranks['flush'] = findFlush(handWithIndex);
    ranks['fullHouse'] = findFullHouse(handWithIndex);
    ranks['fourOfAKind'] = findFourOfAKind(handWithIndex);
    ranks['straightFlush'] = findStraightFlush(handWithIndex);
    ranks['royalFlush'] = findRoyalFlush(handWithIndex);

    return ranks;
}

function handScore(hand) {
    var handWithIndex = {};

    handWithIndex['hand'] = hand;
    handWithIndex['ranksAsNumbers'] = mapRanksToNumbers(hand);
    handWithIndex['rankIndex'] = buildRankIndex(handWithIndex);
    handWithIndex['suitIndex'] = buildSuitIndex(hand);
    handWithIndex['ranks'] = findRanks(handWithIndex);
    handWithIndex['rankScore'] = rankScore(handWithIndex);

    return handWithIndex;
}

var highest = ['QH', '4C', '8S', '5C', 'AS'];
var pair = ['6H', '6C', '4D', '8S', '2D'];
var twoPairs = ['7C', '3H', '5S', '7H', '3S'];
var threeOfAKind = ['8D', '8C', '2D', '8S', 'TH'];
var straight = ['6H', '8S', '9C', 'TS', '7D'];
var flush = ['7D', '2D', '9D', 'AD', 'JD'];
var fullHouse = ['5S', '5C', '8C', '5H', '8S'];
var fourOfAKind = ['JS', 'JC', 'JH', 'JD', '5D'];
var straightFlush = ['2D', '3D', '4D', '5D', '6D'];
var royalFlush = ['TH', 'JH', 'KH', 'QH', 'AH'];

function findOfAKinds(n, handWithIndex) {
    var keys = Object.keys(handWithIndex.rankIndex);
    return keys.reduce(function(accumulator, currentValue, index, array) {
        if (handWithIndex.rankIndex[currentValue].length === n) {
            accumulator.push(parseInt(currentValue));
        }
        return accumulator;
    }, []);
}

function findHighest(handWithIndex) {
    handWithIndex.ranksAsNumbers.sort(compareDecreasing);
    return handWithIndex.ranksAsNumbers[0];
}

function findHigh(handWithIndex) {
    handWithIndex.ranksAsNumbers.sort(compareDecreasing);
    var result = [];
    result.push(0);
    result = result.concat(handWithIndex.ranksAsNumbers);
    return result;
}

function findPair(handWithIndex) {
    var pair = findOfAKinds(2, handWithIndex);
    var result = [];
    if (pair.length === 1) {
        result.push(1);
        result = result.concat(pair);
        var rest = findOfAKinds(1, handWithIndex);
        rest.sort(compareDecreasing);
        result = result.concat(rest);
    }
    return result;
}

function findTwoPairs(handWithIndex) {
    var twoPairs = findOfAKinds(2, handWithIndex);
    var result = [];
    if (twoPairs.length === 2) {
        result.push(2);
        var rest = findOfAKinds(1, handWithIndex);
        rest.sort(compareDecreasing);
        twoPairs.sort(compareDecreasing);
        result = result.concat(twoPairs);
        result = result.concat(rest);
    }
    return result;
}

function findThreeOfAKind(handWithIndex) {
    var threeOfAKind = findOfAKinds(3, handWithIndex);
    var result = [];
    if (threeOfAKind.length === 1) {
        result.push(3);
        var rest = findOfAKinds(1, handWithIndex);
        rest.sort(compareDecreasing);
        result = result.concat(threeOfAKind);
        result = result.concat(rest);
    }
    return result;
}

function compareDecreasing(a, b) {
    return b-a;
}

function isConsecutiveFallingSequence(arrayOfNumbers) {
    for (var i = 1; i < arrayOfNumbers.length; i++) {
        if (arrayOfNumbers[i-1] - 1 !== arrayOfNumbers[i]) {
            return false;
        }
    }
    return true;
}

function findStraight(handWithIndex) {
    handWithIndex.ranksAsNumbers.sort(compareDecreasing);
    var result = [];
    if (isConsecutiveFallingSequence(handWithIndex.ranksAsNumbers)) {
        result.push(4);
        result = result.concat(handWithIndex.ranksAsNumbers);
    }
    return result;
}

function findFlush(handWithIndex) {
    var keys = Object.keys(handWithIndex.suitIndex);
    var result = [];
    if (keys.length === 1) {
        result.push(5);
        result = result.concat(handWithIndex.ranksAsNumbers);
    }
    return result;
}

function findFullHouse(handWithIndex) {
    var threeOfAKind = findOfAKinds(3, handWithIndex);
    var twoOfAKind =  findOfAKinds(2, handWithIndex);
    var result = [];
    if (threeOfAKind.length === 1 && twoOfAKind.length === 1) {
        result.push(6);
        result = result.concat(threeOfAKind);
        result = result.concat(twoOfAKind);
    }
    return result;
}

function findFourOfAKind(handWithIndex) {
    var fourOfAKind = findOfAKinds(4, handWithIndex);
    var result = [];
    if (fourOfAKind.length === 1) {
        result.push(7);
        var rest = findOfAKinds(1, handWithIndex);
        rest.sort(compareDecreasing);
        result = result.concat(fourOfAKind);
        result = result.concat(rest);
    }
    return result;
}

function findStraightFlush(handWithIndex) {
    var straight = findStraight(handWithIndex);
    var flush = findFlush(handWithIndex);
    var result = [];
    if (straight.length === 6 && flush.length === 6) {
        straight.shift();
        result.push(8);
        result = result.concat(straight);
    }
    return result;
}

function findRoyalFlush(handWithIndex) {
    var straightFlush = findStraightFlush(handWithIndex);
    var highestCard = findHighest(handWithIndex);
    var result = [];
    if (straightFlush.length === 6 && highestCard === 14) {
        straightFlush.shift();
        result.push(9);
        result = result.concat(straightFlush);
    }
    return result;
}

function rankScore(handWithIndex) {
    var rankNames = [
        'royalFlush',
        'straightFlush',
        'fourOfAKind',
        'fullHouse',
        'flush',
        'straight',
        'threeOfAKind',
        'twoPairs',
        'pair',
        'highest'
    ];

    for (var i = 0; i < rankNames.length; i++) {
        var current = handWithIndex.ranks[rankNames[i]];
        if (current.length > 0) {
            return current;
        }
    }
    return [];
}

function winner(index, hand1, hand2) {
    if (index === hand1.length-1 || index === hand2.length-1) {
        return 0;
    }
    var first1 = hand1[index];
    var first2 = hand2[index];
    if (first1 < first2) {
        return 1;
    } else if (first1 > first2) {
        return -1;
    } else {
        return winner(index+1, hand1, hand2);
    }
}

//var score = handScore(highest);
//var score = handScore(pair);
//var score = handScore(twoPairs);
//var score = handScore(threeOfAKind);
//var score = handScore(straight);
//var score = handScore(flush);
//var score = handScore(fullHouse);
//var score = handScore(fourOfAKind);
//var score = handScore(straightFlush);
//var score = handScore(royalFlush);
//console.log(logit(score));

//console.log(logit(hands));
//console.log(typeof hands);

function printHands(hands) {
    var totalWins = [0,0,0];
    hands.forEach(function(hand) {
        var hand1 = hand[0];
        var hand2 = hand[1];
        var hand1score = handScore(hand1);
        var hand2score = handScore(hand2);
        var win = winner(0, hand1score.rankScore, hand2score.rankScore);
        if (win === -1) {
            totalWins[1]++;
            console.log(logit(hand1score.rankScore), '<', logit(hand2score.rankScore), totalWins);
        } else if (win === 1) {
            totalWins[2]++;
            console.log(logit(hand1score.rankScore), '>', logit(hand2score.rankScore), totalWins);
        } else {
            console.log(logit(hand1score.rankScore), '=', logit(hand2score.rankScore));
        }
    });
    console.log("player 1 wins", totalWins[1], "hands");
}

printHands(hands.hands);
