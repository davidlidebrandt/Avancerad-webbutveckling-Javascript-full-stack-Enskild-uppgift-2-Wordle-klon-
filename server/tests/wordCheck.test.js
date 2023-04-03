import {
    describe,
    expect,
    test,
  } from "@jest/globals";
  
  import wordCheck from "../js/wordCheck.js";
  
  describe("wordCheck()", () => {
  
    /*
      Ensures that a letter not found in the correct word is marked as incorrect.
    */
    test("Should match object with key 'W' and value 'incorrect' for the first letter", () => {
      const result = wordCheck("words", "lords");
      expect(result[0]).toMatchObject({ W: "incorrect" });
    });
  
    /*
      Ensures that a letter found and is at the correct position in the correct word is marked as correct.
    */
    test("Should match object with key 'D' and value 'correct' for the last letter", () => {
      const result = wordCheck("words", "lords");
      expect(result[4]).toMatchObject({ S: "correct" });
    });
  
    /*
      Ensures that a letter found in the correct word but at the wrong position is marked as misplaced.
    */
    test("Should match object with key 'G' and value 'misplaced' for the first letter", () => {
      const result = wordCheck("great", "signs");
      expect(result[0]).toMatchObject({ G: "misplaced" });
    });
  
    /*
      Ensures that a letter found in the correct word is marked as incorrect when
      the same letter is also found at the correct position (avoiding duplicate findings).
    */
    test("Should match object with key 'L' and value 'incorrect' for the third letter", () => {
      const result = wordCheck("HALLÅ", "CYKLA");
      expect(result[2]).toMatchObject({ L: "incorrect" });
    });
  
    /*
      Ensures that a letter found in the correct word is marked as incorrect when
      the same letter was found earlier but at the wrong position (avoiding duplicate findings).
    */
      test("Should match object with key 'L' and value 'incorrect' for the third letter", () => {
        const result = wordCheck("hålla", "lista");
        expect(result[3]).toMatchObject({ L: "incorrect" });
      });
  
  });