package backend.domain;

public final class Constants {

  public static final int WORD_MIN_LENGTH = 4;
  public static final int WORD_MAX_LENGTH = 7;
  public static final int FIXED_INDEX_MIN_VALUE = 0;
  public static final int FIXED_INDEX_MAX_VALUE = WORD_MAX_LENGTH - 1;

  private Constants() {
    throw new AssertionError("Constants class should not be instantiated.");
  }
}
