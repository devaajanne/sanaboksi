package backend.util;

public final class Constants {

  public static final int WORD_MIN_LENGTH = 4;
  public static final int WORD_MAX_LENGTH = 7;
  public static final int FIXED_INDEX_MIN_VALUE = 0;
  public static final int FIXED_INDEX_MAX_VALUE = WORD_MAX_LENGTH - 1;

  public static final String BUG_REPORT = "bugReport";
  public static final String FEEDBACK = "feedback";
  public static final String GITHUB_API_VERSION = "2026-03-10";

  private Constants() {
    throw new AssertionError("Constants class should not be instantiated.");
  }
}
