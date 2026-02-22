from sea import runtime
from sea import runtime_utils


def test_runtime_exposes_shared_format_helper() -> None:
    assert runtime._format is runtime_utils._format


def test_runtime_exposes_shared_streaming_helper() -> None:
    assert runtime._is_llm_streaming_enabled is runtime_utils._is_llm_streaming_enabled
