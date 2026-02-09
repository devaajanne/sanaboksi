DROP TABLE IF EXISTS five_letter_words;

CREATE TABLE IF NOT EXISTS five_letter_words
(
    id      BIGSERIAL PRIMARY KEY,
    word    VARCHAR(5) NOT NULL
);