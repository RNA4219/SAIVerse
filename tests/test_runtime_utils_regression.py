from sea import runtime
from sea import runtime_utils


def test_runtime_exposes_shared_format_helper() -> None:
    assert runtime._format is runtime_utils._format


def test_runtime_exposes_shared_streaming_helper() -> None:
    assert runtime._is_llm_streaming_enabled is runtime_utils._is_llm_streaming_enabled


import asyncio
from types import SimpleNamespace


def test_subplay_node_uses_runtime_utils_even_if_runtime_format_missing(monkeypatch) -> None:
    monkeypatch.delattr(runtime, "_format", raising=False)

    runtime_obj = runtime.SEARuntime(manager_ref=object())
    runtime_obj._load_playbook_for = lambda *args, **kwargs: object()
    runtime_obj._effective_building_id = lambda *args, **kwargs: "b1"
    runtime_obj._run_playbook = lambda *args, **kwargs: ["ok"]

    node_def = SimpleNamespace(id="sub", playbook="pb", input_template="hello {input}", execution="inline")
    playbook = SimpleNamespace(name="meta")
    node = runtime_obj._lg_subplay_node(node_def, SimpleNamespace(), "b1", playbook, auto_mode=False)

    state = {"inputs": {"input": "world"}, "last": "", "messages": []}
    result = asyncio.run(node(state))
    assert result["last"] == "ok"
