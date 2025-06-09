package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.Recharge;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RechargeRepository extends JpaRepository<Recharge, Long> {

    @EntityGraph(attributePaths = {"compte"})
    List<Recharge> findByCompteId(Long compteId);
}

