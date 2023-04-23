import { TrophyOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis
} from "recharts";

function HistoryStatistics({ history }) {
  const [isStatisticsVisible, setIsStatisticsVisible] = useState(false);
  const scoreHistory = useMemo(
    () =>
      history &&
      Object.keys(history).map((key) => {
        return { score: history[key].score, day: key };
      }),
    [history]
  );
  console.log({ history, scoreHistory });

  const [totalGames, setTotalGames] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState({});

  useEffect(() => {
    if (scoreHistory) {
      const totalGames = scoreHistory.length;
      const winRate = Math.round(
        (scoreHistory.filter((score) => score.score > 0).length * 100) /
          totalGames
      );

      const newScoreDistribution = {};
      scoreHistory.forEach((score) => {
        newScoreDistribution[score.score] =
          (newScoreDistribution[score.score] ?? 0) + 1;
      });
      setScoreDistribution(
        Object.keys(newScoreDistribution).map((key) => {
          return {
            count: newScoreDistribution[key],
            score: key > 0 ? key : "DNF",
          };
        })
      );
      const winStreak = scoreHistory.reduce((acc, score) => {
        if (score.score > 0) {
          return acc + 1;
        } else {
          return 0;
        }
      }, 0);
      setTotalGames(totalGames);
      setWinRate(winRate);
      setWinStreak(winStreak);
    }
  }, [scoreHistory]);

  console.log({ scoreDistribution });

  return (
    <>
      <Button
        onClick={() => setIsStatisticsVisible(true)}
        icon={<TrophyOutlined />}
      />

      <Modal
        open={isStatisticsVisible}
        onCancel={() => setIsStatisticsVisible(false)}
        footer={null}
      >
        <Row justify="center">
          <h2>Statistics</h2>
        </Row>
        <Row justify="space-between">
          <Col span={6} align="middle">
            <h3>Total Games</h3>
            <p>{totalGames}</p>
          </Col>
          <Col span={6} align="middle">
            <h3>Win Rate</h3>
            <p>{winRate}%</p>
          </Col>
          <Col span={6} align="middle">
            <h3>Win Streak</h3>
            <p>{winStreak}</p>
          </Col>
        </Row>
        <Row justify="center">
          <h3>Score Distribution</h3>
        </Row>
        <BarChart width={400} height={250} data={scoreDistribution}>
          <XAxis dataKey="score" />
          <YAxis dataKey="count" allowDecimals={false} />
          <Bar dataKey="count" fill="#3cb043" />
        </BarChart>
      </Modal>
    </>
  );
}

export default HistoryStatistics;
