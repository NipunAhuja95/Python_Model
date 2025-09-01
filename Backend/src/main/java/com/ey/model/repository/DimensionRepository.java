package com.ey.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ey.model.entity.Dimension;

@Repository
public interface DimensionRepository extends JpaRepository<Dimension, Long>{
	
	public List<Dimension> findByActiveStatus(int status);
	
	public Optional<Dimension> findByName(String code);

}
