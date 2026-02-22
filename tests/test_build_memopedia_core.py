from scripts.memopedia.build_memopedia_core import (
    build_memopedia_actions,
    category_to_root_id,
    filter_valid_pages,
)


def test_filter_valid_pages_keeps_required_fields() -> None:
    pages = [
        {"category": "people", "title": "A", "summary": "s", "content": "c"},
        {"category": "people", "title": "B"},
    ]

    result = filter_valid_pages(pages)

    assert len(result) == 1
    assert result[0]["title"] == "A"


def test_build_memopedia_actions_splits_create_and_append() -> None:
    pages = [
        {"category": "people", "title": "Alice", "summary": "s", "content": "new"},
        {"category": "terms", "title": "World", "summary": "s2", "content": "term", "keywords": ["k"]},
    ]

    existing_map = {"people:Alice": "page-id"}
    actions = build_memopedia_actions(pages, existing_map)

    assert actions == [
        {"type": "append", "page_id": "page-id", "title": "Alice", "content": "new"},
        {
            "type": "create",
            "parent_id": category_to_root_id("terms"),
            "title": "World",
            "summary": "s2",
            "content": "term",
            "keywords": ["k"],
        },
    ]
