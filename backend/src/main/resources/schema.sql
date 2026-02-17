DROP TABLE IF EXISTS finnish_words;

CREATE TABLE IF NOT EXISTS finnish_words
(
    id              BIGSERIAL PRIMARY KEY,
    word            VARCHAR NOT NULL UNIQUE CHECK (LENGTH(word) >= 5 AND LENGTH(word) <= 7)
);