# Nvidia NIM APIキーの取得方法

## 概要

Nvidia NIM (NVIDIA Inference Microservices) は、NVIDIAが提供するAI推論サービスです。Llama、Mistral、Qwenなど様々なオープンソースモデルを高速に実行できます。

## 1. NVIDIA Developerアカウントの作成

1. [NVIDIA Developer](https://developer.nvidia.com/) にアクセス
2. 「Join」または「Login」をクリック
3. NVIDIAアカウントを作成またはログイン

## 2. NIM APIキーの生成

1. [NVIDIA NIM](https://build.nvidia.com/) にアクセス
2. 利用したいモデルを選択（例: Mistral Large）
3. 「Get API Key」をクリック
4. APIキーを生成してコピー

## 3. 料金について

**NIMのLLM APIは現在完全無料です。** 課金の仕組みはまだ導入されていません（2026年2月時点）。

APIキーを取得すれば、全モデルを無料で利用できます。

## 4. 利用可能なモデル

SAIVerseに設定済みのNIMモデル：

- **Mistral Large 3**: 高性能オープンウェイトモデル
- **DeepSeek V3.2**: 高性能・低コストモデル
- **Qwen 3 235B-A22B**: Alibaba Cloudの大規模MoEモデル
- **Qwen 3 Next 80B-A3B**: Qwen 3の軽量版（instruct / thinking）
- **Qwen 3 Coder 480B-A35B**: コーディング特化モデル
- **Kimi K2.5**: Moonshotの高性能モデル（画像対応）
- **MiniMax M2.1**: MiniMaxの大規模モデル
- **Z.ai GLM-4.7**: 智谱AIのフラッグシップモデル
- **Step 3.5 Flash**: StepFunの高速モデル
- **GPT-OSS 120B**: OpenAIのオープンウェイトモデル

## 5. 特徴

- **高速推論**: NVIDIAのGPUインフラによる高速処理
- **低レイテンシ**: エンタープライズ向けの安定した応答時間
- **スケーラビリティ**: 大規模なリクエストにも対応
- **OpenAI互換API**: 既存のOpenAI SDKでそのまま利用可能

## 6. APIエンドポイント

Nvidia NIMはOpenAI互換APIを提供します：
```
https://integrate.api.nvidia.com/v1
```

## 環境変数

SAIVerseでは以下の環境変数名を使用します：
```
NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 参考リンク

- [NVIDIA NIM](https://build.nvidia.com/)
- [NVIDIA Developer](https://developer.nvidia.com/)
- [NIM ドキュメント](https://docs.nvidia.com/nim/)
- [モデルカタログ](https://build.nvidia.com/explore/discover)
